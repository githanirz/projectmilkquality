import pymysql
pymysql.install_as_MySQLdb()

from app import create_app

app = create_app()

@app.route('/')
def home():
    return "Test"

if __name__ == '__main__':
    app.run(debug=True)
