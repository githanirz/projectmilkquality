from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.routes import main
from app.mitra_routes import mitra_bp
from app.prediksi_routes import prediksi_bp
from app.riwayat_routes import riwayat_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # Hapus baris mysql.init_app(app) karena sudah tidak pakai flask_mysqldb

    app.register_blueprint(main)
    app.register_blueprint(mitra_bp)
    app.register_blueprint(prediksi_bp)
    app.register_blueprint(riwayat_bp)

    return app
