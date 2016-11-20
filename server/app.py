#!/usr/bin/env python



import qrcode
import qrcode.image.svg
import sys
import logging
import json
import sqlite3
import cStringIO
from flask import Flask
from flask import send_file
from flask import request

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


@app.route('/get_qrimg')

def gen_qr_code(url):
	"""
	use qrcode library to generate qrcode
	input: url (supposed to be the url from BHL)
	output: img_object generate which represents the qrcode
	"""

	factory = qrcode.image.svg.SvgImage
    qr = qrcode.QRCode(box_size=10,
						der=4,image_factory=factory,)
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image()

	return img


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

	return data_url


if __name__ == '__main__':
	description = """QR_iosities API"""

	logging.basicConfig(level=logging.INFO)
	logger = logging.getLogger("QR_iosities")

	app.run(host='0.0.0.0', port=8000)
