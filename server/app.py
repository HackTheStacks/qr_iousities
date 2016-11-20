#!/usr/bin/env python

import sys
import logging
import json
import sqlite3

from flask import Flask
app = Flask(__name__)

@app.route("/get_artifact", methods=["GET", "POST", "OPTIONS"])
def get_artifact(long_url):
	"""
	DB QUERY: SELECT ALL NECESSARY FIELDS TO DISPLAY ON UI BASED ON LONG URL (assume you have that)
    longUrl is of type string
	"""
    # returns everything that UI needs (basically everything but table ID)
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    url = (long_url,)
    c.execute('SELECT * FROM items WHERE LongUrl=?' , url)
    response = c.fetchone()

    #if there is no entry with this longUrl, insert a new entry
    # itemId, name, descriptor, shortUrl, longUrl aren't defined here at the moment but will need to be supplied by the user
    if response is None:
        c.execute('INSERT INTO items VALUES (?,?,?,?,?)', (itemId, name, descriptor, shortUrl, longUrl))
        conn.commit()
    else:
        return response
    conn.close()

@app.route("/s/<short_url>", methods=["GET", "POST", "OPTIONS"])
def redirect(short_url):
    return 'Redirect me to: ' + short_url

@app.route("/update_artifact", methods=["GET", "POST", "OPTIONS"])
def update_artifact(short_url, long_url):
	"""
	DB QUERY: UPDATE LONG URL BASED ON SHORT URL (assume you have that)
	"""
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    s_url = (short_url,)
    l_url = (long_url,)
    c.execute('UPDATE items SET LongUrl = ? WHERE ShortUrl = ?', (l_url, s_url) )
    conn.commit()
    conn.close()
    return 'Update my artifact!'


if __name__ == '__main__':
	description = """QR_iosities API"""

	logging.basicConfig(level=logging.INFO)
	logger = logging.getLogger("QR_iosities")

	app.run(host='0.0.0.0', port=8000)