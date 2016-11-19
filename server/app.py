#!/usr/bin/env python

import logging
import json
import sqlite3

from flask import Flask ,redirect, request
app = Flask(__name__)

@app.route("/get_artifact", methods=["GET", "POST", "OPTIONS"])
def get_artifact():
    """
    DB QUERY: SELECT ALL NECESSARY FIELDS TO DISPLAY ON UI BASED ON LONG URL (assume you have that)
    """
    data = request.form
    long_url = None
    if 'longUrl' in data:
        long_url = data['longUrl']

    res = json.dumps(data)
    return res

@app.route("/get_all_artifacts", methods=["GET", "OPTIONS"])
def get_all_artifacts():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM items')
    response = c.fetchone()
    return json.dumps(response)

@app.route("/s/<short_url>", methods=["GET", "POST", "OPTIONS"])
def redirect(short_url):
    return redirect(short_url, code=302)

@app.route("/update_artifact", methods=["GET", "POST", "OPTIONS"])
def update_artifact():
    """
    DB QUERY: UPDATE LONG URL BASED ON SHORT URL (assume you have that)
    """
    data = request.form
    if 'longUrl' in data:
        long_url = data['longUrl']
        short_url = data['shortUrl']
    res = json.dumps(data)
    return res

if __name__ == '__main__':
    description = """QR_iosities API"""

    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("QR_iosities")

    app.run(host='0.0.0.0')
