from flask import Blueprint, request, jsonify
from app.db_config import get_connection
import pandas as pd
import joblib
import os
from custom_models import RandomForest, DecisionTree
from datetime import datetime

prediksi_bp = Blueprint("prediksi", __name__)

model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'random_forest_model.pkl')
model = joblib.load(model_path)

features = ['Fat', 'AddedWater', 'Protein']

@prediksi_bp.route("/prediksi", methods=["POST"])
def do_prediksi():
    data = request.json

    try:
        input_data = pd.DataFrame([{
             'Fat': float(data['Fat']),
            'AddedWater': float(data['AddedWater']),
            'Protein': float(data['Protein'])
        }])
    except KeyError as e:
        return jsonify({"error": f"Field {str(e)} is missing"}), 400

    prediksi = int(model.predict(input_data)[0])
    hasil_prediksi = "Bagus" if prediksi == 1 else "Tidak Bagus"

    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO prediksi (admin_id, mitra_id, tanggal_prediksi, added_water, protein, fat, hasil, created_at)
        VALUES (%s, %s, CURDATE(), %s, %s, %s, %s, NOW())
    """, (
        data.get("admin_id"),
        data.get("mitra_id"),
        data.get("AddedWater"),
        data.get("Protein"),
        data.get("Fat"),
        hasil_prediksi
    ))
    conn.commit()
    cur.close()

    return jsonify({"hasil_prediksi": hasil_prediksi}), 200


@prediksi_bp.route("/upload-excel", methods=["POST"])
def prediksi_excel():
    file = request.files.get('file')
    admin_id = request.form.get('admin_id')

    if not file or not admin_id:
        return jsonify({"error": "File atau admin_id tidak ada"}), 400

    try:
        df = pd.read_excel(file)

        required_columns = ['nama', 'Fat', 'AddedWater', 'Protein']
        if not all(col in df.columns for col in required_columns):
            return jsonify({"error": "Format file tidak valid. Kolom yang dibutuhkan: nama, Fat, AddedWater, Protein"}), 400
        df.fillna({
            'Fat': 0,
            'AddedWater': 0,
            'Protein': 0
        }, inplace=True)

        result = []
        conn = get_connection()
        cur = conn.cursor()

        for _, row in df.iterrows():
            try:
                nama_mitra = str(row['nama']) if pd.notna(row['nama']) else None
                Fat = float(row['Fat']) if pd.notna(row['Fat']) else 0
                AddedWater = float(row['AddedWater']) if pd.notna(row['AddedWater']) else 0
                Protein = float(row['Protein']) if pd.notna(row['Protein']) else 0

                if not nama_mitra:
                    continue

                # Prediksi
                input_df = pd.DataFrame([{"Fat": Fat, "AddedWater": AddedWater, "Protein": Protein}])
                hasil = model.predict(input_df)[0]
                hasil_label = "Bagus" if hasil == 1 else "Tidak Bagus"

                # Get mitra_id
                cur.execute("SELECT id FROM mitra WHERE nama = %s", (nama_mitra,))
                mitra = cur.fetchone()
                if not mitra:
                    result.append({
                        "nama": nama_mitra,
                        "error": "Mitra tidak ditemukan di database"
                    })
                    continue

                mitra_id = mitra[0]
                cur.execute("""
                    INSERT INTO prediksi (admin_id, mitra_id, tanggal_prediksi, added_water, protein, fat, hasil, created_at)
                    VALUES (%s, %s, CURDATE(), %s, %s, %s, %s, NOW())
                """, (admin_id, mitra_id, AddedWater, Protein, Fat, hasil_label))

                result.append({
                    "nama": nama_mitra,
                    "Fat": Fat,
                    "AddedWater": AddedWater,
                    "Protein": Protein,
                    "hasil_prediksi": hasil_label,
                      "tanggal_prediksi": datetime.now().strftime('%Y-%m-%d')
                })
            except Exception as e:
                result.append({
                    "nama": str(row.get('nama', 'Unknown')),
                    "error": f"Error processing row: {str(e)}"
                })
                continue

        conn.commit()
        return jsonify({"data": result}), 200

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500