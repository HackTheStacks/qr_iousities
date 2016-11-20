#!/usr/bin/env python

import sqlite3
from flask import g

DATABASE = 'database.db'

class DB():
    def __init__(self):
        self.db = sqlite3.connect(DATABASE)

    def get_db():
        db = getattr(g, '_database', None)
        if db is None:
            db = g._database = sqlite3.connect(DATABASE)
        return db

    def close_connection(exception):
        db = getattr(g, '_database', None)
        if db is not None:
            db.close()

    def query(self, query, args=(), one=False):
        cur = self.db.execute(query, args)
        results = cur.fetchall()
        cur.close()
        return (results[0] if results else None) if one else results

    def execute_cmd(self, query, args=(), one=False):
        cur = self.db.execute(query, args)
        cur.close()
        return "Success executing query"

    def getNextTableID():
        query = 'SELECT Max(TableID) from items'
        cur = self.db.execute(query, ())
        nextID = cur.fetchone()[0] + 1
        return nextID
