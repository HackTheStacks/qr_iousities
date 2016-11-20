#!/usr/bin/env python

import qrcode
import qrcode.image.svg
import logging
import json
import os
import cStringIO
import base64
import time
import sys

from flask import Flask, redirect, request, Response
from database import DB
from shortener import Shortener

app = Flask(__name__)
db = DB()
shortener = Shortener()

# @app.teardown_appcontext
# def close_connection(exception):
    # db.close_connection(exception)

def json_resp(content):
    resp = Response(content, mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Method'] = 'GET, POST, OPTIONS'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'

    return resp

@app.route("/")
def home():
    return 'Redirect to front-end!'

@app.route("/get_artifact", methods=["GET", "POST", "OPTIONS"])
def get_artifact():
    data = request.get_json()
    artifact = {}
    long_url = None
    if not data == None and 'longUrl' in data:
        long_url = data['longUrl']
        url = (long_url,)
        item = db.query('SELECT * FROM items WHERE LongUrl=?', url, True)
        if not item == None:
            artifact['id'] = item[0]
            artifact['itemId'] = item[1]
            artifact['title'] = item[2]
            artifact['descriptor'] = item[3]
            artifact['shortUrl'] = item[4]
            artifact['longUrl'] = item[5]

    content = json.dumps(artifact)

    return json_resp(content)

@app.route("/get_all_artifacts", methods=["GET", "OPTIONS"])
def get_all_artifacts():
    artifacts = []
    response = db.query('SELECT * FROM items')
    if not response == None:
        for item in response:
            artifact = {}
            artifact['id'] = item[0]
            artifact['itemId'] = item[1]
            artifact['title'] = item[2]
            artifact['descriptor'] = item[3]
            artifact['shortUrl'] = item[4]
            artifact['longUrl'] = item[5]
            artifacts.append(artifact)

    content = json.dumps(artifacts)

    return json_resp(content)


@app.route("/stats/<table_id>", methods=["GET"])
def stats(table_id):
    """
    Lookup stats for a specific item
    """
    stats = []
    response = db.query('SELECT CreatedAt FROM stats WHERE TableId=?', table_id, True)
    if not response == None:
        for item in response:
            stats = {}
            artifact['createdAt'] = stats[0]
            stats.append(stats)

    content = json.dumps(artifacts)

    return json_resp(content)


@app.route("/s/<short_url>", methods=["GET"])
def redirect_url(short_url):
    """
    Lookup long url from the short url and redirect the user
    """
    url = (short_url,)
    destination = db.query('SELECT LongUrl, TableID FROM items WHERE ShortUrl=?', url, True)

    if destination:
        try:
            DB.insert("INSERT INTO stats(ItemsTableID, CreatedAt) VALUES(?, ?)", (destination[1], time.strftime('%Y-%m-%d %H:%M:%S')))
        except:
            e = sys.exc_info()[0]
            print(e)

        # Requires the destination url to have `http(s)://` as a part of the url
        return redirect(location=destination[0], code=302)
    else:
        """ TODO 4040040404040404040"""
        pass


@app.route("/update_artifact", methods=["GET", "POST", "OPTIONS"])
def update_artifact():
    data = request.get_json()
    if not data == None and 'longUrl' in data:
        long_url = data['longUrl']
        short_url = data['shortUrl']

    content = json.dumps(data)

    return json_resp(content)

@app.route("/delete_artifact", methods=["GET", "POST", "OPTIONS"])
def delete_artifact():
    data = request.get_json()
    content = ""
    if not data == None and 'Id' in data:
        ItemID = data['Id']
        response = db.delete('DELETE FROM items WHERE TableID=?', ItemID, True)
        content = json.dumps(response)
    else:
        content = "Failure deleting Item from the DB"

    resp = Response(content, mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Method'] = 'GET, POST, OPTIONS'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'

    return resp

def get_level(level):
    if level == 'CRITICAL':
        return logging.CRITICAL
    elif level == 'ERROR':
        return logging.ERROR
    elif level == 'WARNING':
        return logging.WARNING
    elif level == 'DEBUG':
        return logging.DEBUG
    else:
        return logging.INFO

def gen_qr_code(url):

    """
    use qrcode library to generate qrcode
    input: url (supposed to be the url from BHL)
    output: img_object generate which represents the qrcode
    """

    factory = qrcode.image.svg.SvgImage
    qr = qrcode.QRCode(box_size=10, border=4, image_factory=factory,)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image()

    return img

@app.route('/get_qrimg/<url>')
def get_qrimg(url):

    """
    transfer QRcode to base64 format
    input: url (supposed to be the url from BHL)
    output: img_url which represents the qrcode
    """
    check = db.query("SELECT qrcode_base FROM qrcode WHERE shortUrl=?",(url,),True)

    if check == None:
        img = gen_qr_code(url)
        img_buf = cStringIO.StringIO()
        img.save(img_buf)
        im_data = img_buf.getvalue()
        data_url = 'data:image/svg+xml;base64,' + base64.encodestring(im_data)
        content = json.dumps(data_url.strip())
        db.query("INSERT OR IGNORE INTO qrcode(shortUrl, qrcode_base) VALUES(?, ?)",(url,content))
    else:
        content = check

    resp = Response(content, mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Method'] = 'GET, OPTIONS'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return resp


if __name__ == '__main__':
    description = """QR_iosities API"""

    level = get_level(os.environ.get('LOG_LEVEL', 'INFO'))
    logging.setLevel(level)
    logger = logging.getLogger("QR_iosities")
    app.debug = True

    app.run(host='0.0.0.0')
