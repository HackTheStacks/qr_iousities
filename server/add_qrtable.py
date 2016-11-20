import sqlite3

def create_table():
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    conn = sqlite3.connect('database.db')


    sql_create_qr_table = """ CREATE TABLE IF NOT EXISTS qrcode (
                                            id integer PRIMARY KEY,
                                            shortUrl strings NOT NULL,
                                            qrcode_base text NOT NULL
                                        );"""
    try:
        c = conn.cursor()
        c.execute(sql_create_qr_table)

    except Error as e:
        print(e)
    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_table()
