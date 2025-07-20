import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";

const EditMitra = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    tanggal_gabung: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const fetchMitra = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/mitra`);
        const mitra = res.data.find((m) => m.id === parseInt(id));
        if (mitra) {
          setForm({
            nama: mitra.nama,
            alamat: mitra.alamat,
            tanggal_gabung: mitra.tanggal_gabung,
          });
        }
      } catch (error) {
        console.error("Gagal mengambil data mitra:", error);
      }
    };

    fetchMitra();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.nama.trim()) newErrors.nama = "Nama tidak boleh kosong.";
    if (!form.alamat.trim()) newErrors.alamat = "Alamat tidak boleh kosong.";
    if (!form.tanggal_gabung)
      newErrors.tanggal_gabung = "Tanggal bergabung wajib diisi.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/mitra/${id}`, form);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Gagal update mitra:", error);
      alert("Terdapat kesalahan saat menyimpan data.");
    } finally {
      setLoading(false);
    }
  };
  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate("/mitra");
  };

  useEffect(() => {
    if (isSuccessModalOpen) {
      const modal = document.getElementById("success_modal");
      if (modal) modal.showModal();
    }
  }, [isSuccessModalOpen]);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content">
        <div className="card w-full max-w-2xl bg-white shadow-lg p-20 rounded-lg">
          <form onSubmit={handleSubmit} className=" w-full max-w-md">
            <h2 className="text-5xl font-bold mb-4">Edit Mitra</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Nama Mitra</legend>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Nama"
                  className="input "
                />
                {errors.nama && (
                  <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
                )}
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Alamat Mitra</legend>
                <input
                  type="text"
                  name="alamat"
                  value={form.alamat}
                  onChange={handleChange}
                  placeholder="Alamat"
                  className="input "
                />
                {errors.alamat && (
                  <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>
                )}
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Tanggal Gabung</legend>
                <input
                  type="date"
                  name="tanggal_gabung"
                  value={form.tanggal_gabung}
                  onChange={handleChange}
                  className="input i"
                />
                {errors.tanggal_gabung && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tanggal_gabung}
                  </p>
                )}
              </fieldset>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="submit"
                className={`btn ${loading ? "loading" : ""}`}
                disabled={loading}
                style={{ backgroundColor: "#56BB89", color: "white" }}
              >
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
              <button
                type="button"
                className="btn btn-error text-white"
                onClick={() => navigate("/mitra")}
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
      {isSuccessModalOpen && (
        <Modal
          id="success_modal"
          title="Sukses"
          message="Mitra berhasil Edit."
          onConfirm={handleCloseSuccessModal}
          hideCancel={true}
        />
      )}
    </div>
  );
};

export default EditMitra;
