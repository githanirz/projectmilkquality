import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Navbar";
import Modal from "../components/Modal";

const MitraPage = () => {
  const [mitras, setMitras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  const filteredMitras = mitras.filter((m) =>
    m.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatdate = (tanggal) => {
    if (!tanggal) return "-";

    const date = new Date(tanggal);
    if (isNaN(date)) return "-";

    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "long",
    }).format(date);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/mitra");
      setMitras(res.data);
    } catch (error) {
      console.error("Gagal mengambil data mitra:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/mitra/${id}`);
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus mitra:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openDeleteModal = (id) => {
    setSelectedId(id);
    document.getElementById("delete_modal").showModal();
  };
  return (
    <div className="bg-white min-h-screen text-left">
      <Header />
      <div className="p-6 sm:p-10 md:p-20">
        <h1 className="font-bold text-4xl md:text-5xl mb-4 text-green-900">
          Daftar Mitra
        </h1>
        <h4 className="font-semibold text-md md:text-md mb-8">
          Mitra yang telah bekerja sama dengan Milkta Gemilang
        </h4>
        <div className="flex justify-between items-center mb-10">
          <button
            className="btn transition hover:scale-105"
            onClick={() => navigate("/addmitra")}
            style={{ backgroundColor: "#56BB89", color: "white" }}
          >
            + Tambah Mitra
          </button>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>
        </div>
        <div className="overflow-x-auto ">
          <table className="table  w-full">
            <thead className=" text-base-content">
              <tr>
                <th></th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Tanggal Gabung</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredMitras.map((m, index) => (
                <tr key={m.id}>
                  <td>{index + 1}</td>
                  <td className="capitalize">{m.nama}</td>
                  <td className="capitalize">{m.alamat}</td>
                  <td>{formatdate(m.tanggal_gabung)}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/editmitra/${m.id}`)}
                      className="btn btn-warning btn-sm text-white mr-4 mb-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(m.id)}
                      className="btn btn-error btn-sm text-white mb-2"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMitras.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center font-medium">
                    Tidak ditemukan mitra yang sesuai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Modal
          id="delete_modal"
          title="Konfirmasi Hapus"
          message="Apakah Anda yakin ingin menghapus mitra ini?"
          onConfirm={() => handleDelete(selectedId)}
          onCancel={() => console.log("Batal hapus")}
        />
      </div>
    </div>
  );
};

export default MitraPage;
