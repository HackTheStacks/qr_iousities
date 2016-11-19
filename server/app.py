#!/usr/bin/env python

import sys
import logging
import json
import sqlite3

from flask import Flask
app = Flask(__name__)

@app.route("/get_artifact", methods=["GET", "POST", "OPTIONS"])
def get_artifact():
	"""
	DB QUERY: SELECT ALL NECESSARY FIELDS TO DISPLAY ON UI BASED ON LONG URL (assume you have that)
	"""
    return 'Give me my artifact!'

@app.route("/s/<short_url>", methods=["GET", "POST", "OPTIONS"])
def redirect(short_url):
    return 'Redirect me to: ' + short_url

@app.route("/update_artifact", methods=["GET", "POST", "OPTIONS"])
def update_artifact():
	"""
	DB QUERY: UPDATE LONG URL BASED ON SHORT URL (assume you have that)
	"""
    return 'Update my artifact!'


if __name__ == '__main__':
	description = """QR_iosities API"""

	logging.basicConfig(level=logging.INFO)
	logger = logging.getLogger("QR_iosities")

	app.run(host='0.0.0.0', port=8000)