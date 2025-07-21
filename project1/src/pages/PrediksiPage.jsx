import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import date from "../assets/images/date_icon.png";
import mitraicon from "../assets/images/mitra_icon.png";
import Header from "../components/Navbar";

const PrediksiPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { hasil_prediksi, input, batch_results } = location.state || {};
  const [mitra, setMitra] = useState(null);

  useEffect(() => {
    if (!hasil_prediksi && !batch_results) {
      navigate("/prediksi");
      return;
    }

    if (input?.mitra_id) {
      axios
        .get(
          `https://projectmilkquality-production.up.railway.app/mitra/${input.mitra_id}`
        )
        .then((res) => setMitra(res.data))
        .catch((err) => console.error("Gagal ambil data mitra:", err));
    }
  }, [hasil_prediksi, batch_results, input, navigate]);

  return (
    <div className="min-h-screen bg-white ">
      <Header />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-2 text-green-900 ">
          Hasil Prediksi
        </h1>
        <h4 className="text-lg font-semibold mb-2 text-gray-600 ">
          Menampilkan hasil prediksi berdasarkan parameter pengukuran
        </h4>
      </div>
      {batch_results && batch_results.length > 0 ? (
        <div className="flex justify-center items-center p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {batch_results.map((res, i) => (
              <div key={i} className="card bg-white shadow-md p-6">
                <p className="flex gap-2">
                  <img src={date} className="w-10 h-10" />
                  <span>
                    {new Date(res.tanggal_prediksi).toLocaleDateString("id-ID")}
                  </span>
                </p>
                <p className="flex gap-2 items-center mb-4">
                  <img src={mitraicon} className="w-10 h-10" />
                  <span className="font-medium">{res.nama}</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div
                    className={`stats shadow ${
                      parseFloat(res.Fat) >= 3
                        ? "bg-lime-200 text-black"
                        : "bg-red-600 text-white"
                    } `}
                  >
                    <div className="stat  p-10">
                      <div className="stat-title text-lg font-semibold text-black">
                        Fat%
                      </div>
                      <div className=" text-5xl font-bold mx-">{res.Fat}</div>
                      <div className="stat-desc text-base font-medium text-right pt-4 ml-8 text-black">
                        {parseFloat(res.Fat) >= 3
                          ? "Terpenuhi"
                          : "Tidak Terpenuhi"}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`stats shadow ${
                      parseFloat(res.AddedWater) == 0
                        ? "bg-lime-200 text-black"
                        : "bg-red-600 text-white"
                    } `}
                  >
                    <div className="stat  p-10">
                      <div className="stat-title text-lg font-semibold text-black">
                        AddedWater%
                      </div>
                      <div className=" text-5xl font-bold mx-">
                        {res.AddedWater}
                      </div>
                      <div className="stat-desc text-base font-medium text-right pt-4 ml-8 text-black">
                        {parseFloat(res.AddedWater) == 0
                          ? "Terpenuhi"
                          : "Tidak Terpenuhi"}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`stats shadow ${
                      parseFloat(res.Protein) >= 3
                        ? "bg-lime-200 text-black"
                        : "bg-red-600 text-white"
                    } `}
                  >
                    <div className="stat  p-10">
                      <div className="stat-title text-lg font-semibold text-black">
                        Protein%
                      </div>
                      <div className=" text-5xl font-bold mx-">
                        {res.Protein}
                      </div>
                      <div className="stat-desc text-base font-medium text-right pt-4 ml-8 text-black">
                        {parseFloat(res.Protein) >= 3
                          ? "Terpenuhi"
                          : "Tidak Terpenuhi"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 text-center">
                  <span className="text-2xl font-bold px-4 py-2 text-green-900">
                    Hasil Prediksi
                  </span>
                  <button
                    className={`btn btn-wide text-xl font-semibold px-4 py-2 rounded-lg ${
                      res.hasil_prediksi === "Bagus"
                        ? "bg-green-900 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {res.hasil_prediksi}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center p-8">
          <div className="card bg-white shadow-lg p-10 rounded-lg">
            <div className="space-y-4 text-lg">
              <p className="flex gap-2">
                <img src={date} className="w-10 h-10" />
                <span>
                  {new Date(input?.tanggal_prediksi).toLocaleDateString(
                    "id-ID"
                  )}
                </span>
              </p>
              <p className="flex gap-2">
                <img src={mitraicon} className="w-10 h-10" />
                <span>{mitra?.nama}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <div
                  className={`stats shadow ${
                    parseFloat(input?.Protein) >= 3
                      ? "bg-lime-200 text-black"
                      : "bg-red-600 text-white"
                  } `}
                >
                  <div className="stat  p-10">
                    <div className="stat-title text-lg font-semibold text-black">
                      Protein%
                    </div>
                    <div className=" text-5xl font-bold mx-">
                      {input?.Protein}
                    </div>
                    <div className="stat-desc text-base font-medium text-right pt-4 ml-8 text-black">
                      {parseFloat(input?.Protein) >= 3
                        ? "Terpenuhi"
                        : "Tidak Terpenuhi"}
                    </div>
                  </div>
                </div>
                <div
                  className={`stats shadow ${
                    parseFloat(input?.AddedWater) == 0
                      ? "bg-lime-200 text-black"
                      : "bg-red-600 text-white"
                  } `}
                >
                  <div className="stat  p-10">
                    <div className="stat-title text-lg font-semibold text-black">
                      Added Water%
                    </div>
                    <div className=" text-5xl font-bold ">
                      {input?.AddedWater}
                    </div>
                    <div className="stat-desc text-base font-medium text-right pt-4 ml-8 text-black">
                      {parseFloat(input?.AddedWater) == 0
                        ? "Terpenuhi"
                        : "Tidak Terpenuhi"}
                    </div>
                  </div>
                </div>
                <div
                  className={`stats shadow ${
                    parseFloat(input?.Fat) >= 3
                      ? "bg-lime-200 text-black"
                      : "bg-red-600 text-white"
                  }`}
                >
                  <div className="stat p-10">
                    <div className="stat-title text-lg font-semibold text-black">
                      Fat%
                    </div>
                    <div className="text-5xl font-bold">{input?.Fat}</div>
                    <div className="stat-desc text-base font-medium text-right pt-4 ml-8 text-black">
                      {parseFloat(input?.Fat) >= 3
                        ? "Terpenuhi"
                        : "Tidak Terpenuhi"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <span className="text-2xl font-bold px-4 py-2 text-green-900">
                Hasil Prediksi
              </span>
              <button
                className={`btn btn-wide text-xl font-semibold px-4 py-2 rounded-lg ${
                  hasil_prediksi === "Bagus"
                    ? "bg-green-900 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {hasil_prediksi}
              </button>
            </div>

            {/* <div className="mt-6 text-center">
            <button
              className="btn btn-outline"
              onClick={() => navigate("/prediksi")}
            >
              Prediksi Lagi
            </button>
          </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrediksiPage;
