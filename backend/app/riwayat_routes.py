from flask import Blueprint, request, jsonify
from app.db_config import get_connection


riwayat_bp = Blueprint("riwayat", __name__)

#get riwayat
@riwayat_bp.route("/riwayat", methods=["GET"])
def get_all_riwayat():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
       SELECT p.id, p.admin_id, p.mitra_id, m.nama, p.tanggal_prediksi,
               p.added_water, p.protein, p.fat, p.hasil, p.created_at
        FROM prediksi p
        LEFT JOIN mitra m ON p.mitra_id = m.id
        ORDER BY p.created_at DESC
    """)
    riwayats = cur.fetchall()
    cur.close()
    
    riwayat_list = []
    for r in riwayats:
        riwayat_list.append({
            "id": r[0],
            "admin_id": r[1],
            "mitra_id": r[2],
            "nama": r[3],  # bisa jadi None/null
            "tanggal_prediksi": r[4],
            "added_water": r[5],
            "protein": r[6],
            "fat": r[7],
            "hasil": r[8],
            "created_at": r[9]
        })
        
    return jsonify(riwayat_list)
