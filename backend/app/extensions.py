import pymysql
pymysql.install_as_MySQLdb()

from flask_mysqldb import MySQL  # tetap pakai ini
mysql = MySQL()
