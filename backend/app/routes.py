from flask import Blueprint, request, jsonify
from app.extensions import mysql 
from werkzeug.security import check_password_hash
import os
from flask import make_response


main = Blueprint("main", __name__)
ALLOWED_EMAIL = os.getenv("ALLOWED_EMAIL")

# Manual Login
@main.route('/manual-login', methods=['POST'])
def manual_login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    cur = mysql.connection.cursor()
    cur.execute("SELECT id, password FROM admin WHERE email = %s", (email,))
    user = cur.fetchone()
    cur.close()

    if user and check_password_hash(user[1], password):
        return jsonify({
            "token": "manual_token",  
            "admin_id": user[0],
            "email": email
        }), 200
    else:
        return jsonify({"message": "Email atau password salah"}), 401

# Google Login
@main.route('/google-login', methods=['POST', 'OPTIONS'])
def google_login():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response, 200

    data = request.get_json()
    email = data.get("email")

    if email == ALLOWED_EMAIL:
        response = jsonify({"token": "google_token"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        return response, 200
    else:
        response = jsonify({"message": "Email tidak diizinkan"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        return response, 403