#!/usr/bin/env python

import sys
import logging
import json
import sqlite3

from flask import Flask, redirect, request, Response
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
        
    content = json.dumps(data)

    resp = Response(content, mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.headers['Access-Control-Allow-Method'] = 'GET, OPTIONS'
    resp.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    
    return resp

@app.route("/get_all_artifacts", methods=["GET", "OPTIONS"])
def get_all_artifacts():
    conn = sqlite3.connect('../testDatabase.db')
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
    return redirect("http://www.cnn.com/")

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

if __name__ == '__main__':
    description = """QR_iosities API"""

    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("QR_iosities")

    app.run(host='0.0.0.0')