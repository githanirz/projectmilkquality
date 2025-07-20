import os
from dotenv import load_dotenv


load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY")
    MYSQL_HOST = os.getenv("DB_HOST")
    MYSQL_USER = os.getenv("DB_USER")
    MYSQL_PASSWORD = os.getenv("DB_PASSWORD")
    MYSQL_DB = os.getenv("DB_NAME")
    ALLOWED_EMAIL = os.getenv("ALLOWED_EMAIL")
