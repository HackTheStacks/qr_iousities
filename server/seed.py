#!/usr/bin/env python

import logging
import os
import time
import sys
import time
from random import randint


from database import DB

db = DB()

# @app.teardown_appcontext
# def close_connection(exception):
    # db.close_connection(exception)

if __name__ == '__main__':
    db.execute('''DROP TABLE IF EXISTS items''')
    db.execute('''DROP TABLE IF EXISTS stats''')
    db.execute('''CREATE TABLE items(TableID INTEGER PRIMARY KEY, ItemID text, Name text, Descriptor text, ShortUrl text, LongUrl text)''')
    db.execute('''CREATE TABLE stats(TableID INTEGER, CreatedAt INTEGER)''')

    items = [
        ('1', 'asdf', 'Super Item', 'shorturl', 'http://nytimes.com'),
        ('2', 'fdas', 'Super Item', 'shorturl', 'http://nytimes.com'),
        ('3', 'difj', 'Super Item', 'shorturl', 'http://nytimes.com'),
        ('4', 'asdiofjasodf', 'Super Item', 'shorturl', 'http://nytimes.com'),
        ('5', 'asdfiasdoifj', 'Super Item', 'shorturl', 'http://nytimes.com'),
        ('6', 'adsjf', 'Super Item', 'shorturl', 'http://nytimes.com'),
    ]

    db.executemany('''INSERT INTO items(ItemID, Name, Descriptor, ShortUrl, LongUrl) VALUES (?,?,?,?,?)''', items)

    stats = [(randint(1,6), int(time.time()) - randint(1, 86400000)) for i in range(100006)]

    db.executemany('''INSERT INTO stats(TableId, CreatedAt) VALUES (?,?)''', stats)
