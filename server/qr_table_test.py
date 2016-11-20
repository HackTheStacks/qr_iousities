import sqlite3
import add_qrtable

url = "www.github.com"
conn = sqlite3.connect('database.db')

add_qrtable.create_table(conn)
c = conn.cursor()
c.execute("SELECT EXISTS(SELECT qrcode_base FROM qrcode WHERE shortUrl = '{}')".format(url))
check_data=c.fetchone()
print check_data
