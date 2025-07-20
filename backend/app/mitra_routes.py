from flask import Blueprint, request, jsonify
from app.db_config import get_connection


mitra_bp = Blueprint("mitra", __name__)
# CREATE Mitra
@mitra_bp.route("/mitra", methods=["POST"])
def add_mitra():
    data = request.json
    nama = data.get("nama")
    alamat = data.get("alamat")
    tanggal_gabung = data.get("tanggal_gabung")

    conn = get_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO mitra (nama, alamat, tanggal_gabung) VALUES (%s, %s, %s)", 
            (nama, alamat, tanggal_gabung))
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({"message": "Mitra berhasil ditambahkan"}), 201

# List Mitra
@mitra_bp.route("/mitra", methods=["GET"])
def get_all_mitra():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM mitra")
    mitras = cur.fetchall()
    cur.close()

    mitra_list = []
    for m in mitras:
        mitra_list.append({
            "id": m[0],
            "nama": m[1],
            "alamat": m[2],
            "tanggal_gabung": str(m[3]) if m[3] else None
        })

    return jsonify(mitra_list)

# UPDATE Mitra
@mitra_bp.route("/mitra/<int:id>", methods=["PUT" ])
def update_mitra(id):
    data = request.json
    nama = data.get("nama")
    alamat = data.get("alamat")
    tanggal_gabung = data.get("tanggal_gabung")

    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        UPDATE mitra SET nama=%s, alamat=%s, tanggal_gabung=%s WHERE id=%s
    """, (nama, alamat, tanggal_gabung, id))
    conn.commit()
    cur.close()

    return jsonify({"message": "Mitra berhasil diupdate"})

# DELETE Mitra
@mitra_bp.route("/mitra/<int:id>", methods=["DELETE"])
def delete_mitra(id):
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute("DELETE FROM mitra WHERE id = %s", (id,))
        conn.commit()
        cur.close()
        return jsonify({"message": "Mitra berhasil dihapus."}), 200
    except Exception as e:
        print("Error saat menghapus mitra:", str(e))
        return jsonify({"error": "Terjadi kesalahan saat menghapus mitra."}), 500

@mitra_bp.route("/mitra/<int:id>", methods=["GET"])
def get_mitra_by_id(id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM mitra WHERE id = %s", (id,))
    mitra = cur.fetchone()
    cur.close()
    if not mitra:
        return jsonify({"error": "Mitra tidak ditemukan"}), 404

    return jsonify({
        "id": mitra[0],
        "nama": mitra[1],
        "alamat": mitra[2],
          "tanggal_gabung": mitra[3].strftime("%Y-%m-%d") if mitra[3] else None
    })
