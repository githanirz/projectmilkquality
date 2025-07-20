import pymysql
pymysql.install_as_MySQLdb()
import logging

logging.basicConfig(level=logging.DEBUG)


from dotenv import load_dotenv
load_dotenv()

from app import create_app

app = create_app()

@app.route('/')
def home():
    return "Test"

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
