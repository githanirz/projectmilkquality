import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/navbar";

const RiwayatPage = () => {
  const [riwayats, setRiwayats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRiwayats = riwayats.filter((r) =>
    (r.nama || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  const formatdate = (tanggal) => {
    const date = new Date(tanggal);
    return new Intl.DateTimeFormat("id-ID", {
      dateStyle: "long",
    }).format(date);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/riwayat");
      setRiwayats(res.data);
    } catch (error) {
      console.error("Gagal mengambil data riwayat:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white min-h-screen text-left">
      <Header />
      <div className="p-6 sm:p-10 md:p-20">
        <h1 className="font-bold text-4xl md:text-5xl mb-4 text-green-900">
          Riwayat Prediksi
        </h1>
        <h4 className="font-semibold text-md md:text-md mb-8">
          Data Yang Telah Diprediksi Disimpan.
        </h4>
        <div className="flex justify-end mb-10">
          <label className="input flex items-center gap-2 w-full max-w-sm">
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
                <th>Mitra</th>
                <th>Tanggal Prediksi</th>
                <th>Protein</th>
                <th>Added Water</th>
                <th>Fat</th>
                <th>Hasil Prediksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRiwayats.map((r, index) => (
                <tr key={r.id}>
                  <td>{index + 1}</td>
                  <td className="capitalize">{r.nama || "Mitra dihapus"}</td>
                  <td>{formatdate(r.tanggal_prediksi)}</td>
                  <td className="capitalize">{r.protein}</td>
                  <td className="capitalize">{r.added_water}</td>
                  <td className="capitalize">{r.fat}</td>
                  <td className="capitalize">
                    <button
                      className={`btn btn-sm ${
                        r.hasil === "Bagus"
                          ? "bg-green-900 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {r.hasil}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRiwayats.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center font-medium">
                    Tidak ditemukan hasil prediksi yang sesuai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiwayatPage;
