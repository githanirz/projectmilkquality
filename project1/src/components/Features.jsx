import { useEffect, useState } from "react";
import f1 from "../assets/images/f1.png";
import f2 from "../assets/images/f2.png";
import f3 from "../assets/images/f3.png";
import axios from "axios";

const Features = () => {
  const [totalMitra, setTotalMitra] = useState(0);
  const [totalBagus, setTotalBagus] = useState(0);
  const [totalTidakBagus, setTotalTidakBagus] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:5000/mitra")
      .then((res) => {
        setTotalMitra(res.data.length);
      })
      .catch((err) => console.error("Gagal ambil data mitra:", err));

    axios
      .get("http://localhost:5000/riwayat")
      .then((res) => {
        const data = res.data;
        const bagus = data.filter((d) => d.hasil === "Bagus").length;
        const tidakBagus = data.filter((d) => d.hasil === "Tidak Bagus").length;

        setTotalBagus(bagus);
        setTotalTidakBagus(tidakBagus);
      })
      .catch((err) => console.error("Gagal ambil data riwayat:", err));
  }, []);

  return (
    <div className="hero bg-base-200 min-h-3.5 ">
      <div className="hero-content flex-col w-full mt-32 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-green-900">
            Pelaporan
          </h2>
          <p className="text-xl md:text-2xl font-semibold py-6 text-gray-700">
            Prediksi Kualitas Susu dengan Cepat & Akurat 🥛⚡
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full max-w-6xl mx-auto">
            <div className="stat bg-white shadow-md rounded-lg p-6 text-center">
              <div className="flex justify-center mb-2">
                <img src={f1} className="w-12 h-12 mb-1" />
              </div>
              <div className="stat-title text-2xl font-semibold text-green-600">
                Mitra
              </div>
              <div className="stat-value text-green-700">{totalMitra}</div>
              <div className="stat-desc text-xl">Jumlah Mitra</div>
            </div>

            <div className="stat bg-white shadow-md rounded-lg p-6 text-center">
              <div className="flex justify-center mb-2">
                <img src={f2} className="w-12 h-12 mb-1" />
              </div>
              <div className="stat-title text-2xl font-semibold text-green-600">
                Berkualitas
              </div>
              <div className="stat-value text-green-700 ">{totalBagus}</div>
              <div className="stat-desc text-xl">
                Total Susu Yang Berkualitas
              </div>
            </div>

            <div className="stat bg-white shadow-md rounded-lg p-6 text-center">
              <div className="flex justify-center mb-2">
                <img src={f3} className="w-12 h-12 mb-1" />
              </div>

              <div className="stat-title text-2xl font-semibold text-green-600">
                Tidak Berkualias
              </div>
              <div className="stat-value  text-green-700">
                {totalTidakBagus}
              </div>
              <div className="stat-desc text-xl">
                Total Susu Yang Tidak Berkualitas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
