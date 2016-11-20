#!/usr/bin/env python



import qrcode
import qrcode.image.svg
import sys
import logging
import json
import sqlite3
import os
import cStringIO
import base64

from flask import Flask, redirect, request, Response
from flask import send_file

app = Flask(__name__)

@app.route("/")
def home():
    return 'Redirect to front-end!'

@app.route("/get_artifact", methods=["GET", "POST", "OPTIONS"])
def get_artifact():
    """
    DB QUERY: SELECT ALL NECESSARY FIELDS TO DISPLAY ON UI BASED ON LONG URL (assume you have that)
    """
    data = request.form
    long_url = None
    if 'longUrl' in data:
        long_url = data['longUrl']
    content = json.dumps(data)

    resp = Response(content, mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Method'] = 'GET, POST, OPTIONS'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return resp

@app.route("/get_all_artifacts", methods=["GET", "OPTIONS"])
def get_all_artifacts():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM items')
    response = c.fetchone()

    content = json.dumps(response)

    resp = Response(content, mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Method'] = 'GET, POST, OPTIONS'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'

    return resp

@app.route("/s/<short_url>", methods=["GET", "POST", "OPTIONS"])
def redirect_url(short_url):
    """ Lookup long url from the short url and redirect the user """
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    url = (short_url,)
    c.execute('SELECT LongUrl FROM items WHERE ShortUrl=?' , url)
    response = c.fetchone()
    return redirect(location=response[0], code=302)


@app.route("/update_artifact", methods=["GET", "POST", "OPTIONS"])
def update_artifact():
    """
    DB QUERY: UPDATE LONG URL BASED ON SHORT URL (assume you have that)
    """
    data = request.form
    if 'longUrl' in data:
        long_url = data['longUrl']
        short_url = data['shortUrl']

    content = json.dumps(data)

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
    img_buf = cStringIO.StringIO()
    img = gen_qr_code(url)
    img.save(img_buf)
    im_data = img_buf.getvalue()
    data_url = 'data:image/svg+xml;base64,' + base64.encodestring(im_data)
    content = json.dumps(data_url.strip())
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

    app.run(host='0.0.0.0')
