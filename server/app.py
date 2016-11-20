#!/usr/bin/env python

import logging
import json
import sqlite3
import os

from flask import Flask, redirect, request, Response
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
    resp.headers['Access-Control-Allow-Method'] = 'GET, OPTIONS'
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
    resp.headers['Access-Control-Allow-Method'] = 'GET, OPTIONS'
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
    resp.headers['Access-Control-Allow-Method'] = 'GET, OPTIONS'
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

if __name__ == '__main__':
    description = """QR_iosities API"""

    level = get_level(os.environ.get('LOG_LEVEL', 'INFO'))
    logging.setLevel(level)
    logger = logging.getLogger("QR_iosities")

    app.run(host='0.0.0.0')
