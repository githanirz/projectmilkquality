import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const AddMitra = () => {
  const [add, setAdd] = useState({
    nama: "",
    alamat: "",
    tanggal_gabung: "",
  });
  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setAdd({ ...add, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!add.nama.trim()) newErrors.nama = "Nama Mitra wajib diisi.";
    if (!add.alamat.trim()) newErrors.alamat = "Alamat Mitra wajib diisi.";
    if (!add.tanggal_gabung)
      newErrors.tanggal_gabung = "Tanggal Bergabung wajib diisi.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:5000/mitra", add);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Gagal menambahkan mitra:", error);
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
          <form onSubmit={handleSubmit} className="max-w-md">
            <h1 className="text-5xl font-bold mb-8">Tambah Mitra</h1>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Nama Mitra</legend>
              <input
                name="nama"
                value={add.nama}
                onChange={handleChange}
                type="text"
                className="input"
                placeholder="Nama Mitra"
              />
              {errors.nama && (
                <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Alamat Mitra</legend>
              <input
                name="alamat"
                value={add.alamat}
                onChange={handleChange}
                type="text"
                className="input"
                placeholder="Alamat Mitra"
              />
              {errors.alamat && (
                <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Tanggal Bergabung</legend>
              <input
                name="tanggal_gabung"
                value={add.tanggal_gabung}
                onChange={handleChange}
                type="date"
                className="input"
              />
              {errors.tanggal_gabung && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.tanggal_gabung}
                </p>
              )}
            </fieldset>

            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#56BB89", color: "white" }}
              >
                Tambahkan
              </button>
            </div>
          </form>
        </div>
      </div>

      {isSuccessModalOpen && (
        <Modal
          id="success_modal"
          title="Sukses"
          message="Mitra berhasil ditambahkan."
          onConfirm={handleCloseSuccessModal}
          hideCancel={true}
        />
      )}
    </div>
  );
};

export default AddMitra;
