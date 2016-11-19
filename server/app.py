#!/usr/bin/env python

import sys
import logging
import json

from flask import Flask
app = Flask(__name__)

@app.route("/get_artifact", methods=["GET", "POST", "OPTIONS"])
def get_artifact():
    return 'Give me my artifact!'

@app.route("/s/<short_url>", methods=["GET", "POST", "OPTIONS"])
def redirect(short_url):
    return 'Redirect me to: ' + short_url

@app.route("/update_artifact", methods=["GET", "POST", "OPTIONS"])
def update_artifact():
    return 'Update my artifact!'


if __name__ == '__main__':
	description = """QR_iosities API"""

	logging.basicConfig(level=logging.INFO)
	logger = logging.getLogger("QR_iosities")

	app.run(host='0.0.0.0', port=8000)