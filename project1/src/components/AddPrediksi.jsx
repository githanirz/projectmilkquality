import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Navbar";
import prediksi from "../assets/images/prediksi.svg";
import { useRef } from "react";

const AddPrediksi = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mitra_id: "",
    Fat: "",
    AddedWater: "",
    Protein: "",
  });

  const [errors, setErrors] = useState({});
  const [mitraList, setMitraList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/mitra")
      .then((res) => setMitraList(res.data))
      .catch((err) => console.error("Gagal mengambil data mitra:", err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.mitra_id) newErrors.mitra_id = "Mitra wajib dipilih.";
    if (!formData.Fat) newErrors.Fat = "Fat wajib diisi.";
    else if (isNaN(formData.Fat) || parseFloat(formData.Fat) < 0)
      newErrors.Fat = "Fat harus angka >= 0.";

    if (!formData.AddedWater) newErrors.AddedWater = "Added Water wajib diisi.";
    else if (isNaN(formData.AddedWater) || parseFloat(formData.AddedWater) < 0)
      newErrors.AddedWater = "Added Water harus angka >= 0.";

    if (!formData.Protein) newErrors.Protein = "Protein wajib diisi.";
    else if (isNaN(formData.Protein) || parseFloat(formData.Protein) < 0)
      newErrors.Protein = "Protein harus angka >= 0.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const admin_id = localStorage.getItem("admin_id");
    if (!admin_id) {
      alert("Admin belum login!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/prediksi", {
        admin_id: parseInt(admin_id),
        mitra_id: parseInt(formData.mitra_id),
        Fat: parseFloat(formData.Fat),
        AddedWater: parseFloat(formData.AddedWater),
        Protein: parseFloat(formData.Protein),
      });
      const hasil_prediksi = res.data.hasil_prediksi;

      navigate("/prediksi-hasil", {
        state: {
          hasil_prediksi: hasil_prediksi,
          input: {
            mitra_id: formData.mitra_id,
            Fat: formData.Fat,
            AddedWater: formData.AddedWater,
            Protein: formData.Protein,
            tanggal_prediksi: new Date().toISOString().split("T")[0],
          },
        },
      });
    } catch (err) {
      console.error("Gagal prediksi:", err);
      alert("Terjadi kesalahan saat mengirim prediksi.");
    }
  };

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Silakan pilih file terlebih dahulu.");
      return;
    }

    const admin_id = localStorage.getItem("admin_id");
    if (!admin_id) {
      alert("Admin belum login!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("admin_id", admin_id);

    try {
      const res = await axios.post(
        "http://localhost:5000/upload-excel",
        formData
      );
      const results = res.data.data;

      navigate("/prediksi-hasil", {
        state: { batch_results: results },
      });
    } catch (err) {
      console.error("Upload gagal:", err);
      alert("Gagal mengunggah dan memproses file.");
    }
  };
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="p-16">
        <div className="flex flex-col lg:flex-row gap-8 card bg-base-100 p-8  w-full h-fit shadow-2xl mb-10  ">
          <img src={prediksi} className="max-w-36 " />
          <div className=" w-full lg:w-1/2 ">
            <h1 className="text-5xl font-bold text-green-900">
              Prediksi Kualitas Susu
            </h1>
            <p className="font-semibold text-md mt-4">
              Masukkan hasil parameter pengukuran untuk melakukan prediksi
              kualitas susu secara otomatis.
            </p>
            <p className="font-normal text-md mt-4">
              Admin dapat melakukan input manual ataupun dengan upload file
              excel
            </p>
          </div>
        </div>

        <div className=" flex flex-col lg:flex-row gap-8">
          <div className="card bg-base-100 w-full shadow-2xl p-4">
            <div className="card-body">
              <h2 className="text-xl font-bold text-green-900 ">
                Masukkan Parameter
              </h2>
              <p className="text-sm mt-2 text-gray-500 mb-4">
                Format: Fat = 03.00 lebih, AddedWater = 00.00 , Protein = 03.00
                lebih
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <fieldset>
                  <legend className="font-semibold">Pilih Mitra</legend>
                  <select
                    name="mitra_id"
                    className="input w-full"
                    value={formData.mitra_id}
                    onChange={handleChange}
                  >
                    <option value="">-- Pilih Mitra --</option>
                    {mitraList.map((mitra) => (
                      <option key={mitra.id} value={mitra.id}>
                        {mitra.nama}
                      </option>
                    ))}
                  </select>
                  {errors.mitra_id && (
                    <p className="text-red-500 text-sm">{errors.mitra_id}</p>
                  )}
                </fieldset>

                <fieldset>
                  <legend className="font-semibold">Fat</legend>
                  <input
                    type="number"
                    name="Fat"
                    step="0.01"
                    className="input w-full"
                    value={formData.Fat}
                    onChange={handleChange}
                    placeholder="Kadar Lemak (Fat)"
                  />
                  {errors.Fat && (
                    <p className="text-red-500 text-sm">{errors.Fat}</p>
                  )}
                </fieldset>

                <fieldset>
                  <legend className="font-semibold">Added Water</legend>
                  <input
                    type="number"
                    name="AddedWater"
                    step="0.01"
                    className="input w-full"
                    value={formData.AddedWater}
                    onChange={handleChange}
                    placeholder="Kadar Air Tambahan"
                  />
                  {errors.AddedWater && (
                    <p className="text-red-500 text-sm">{errors.AddedWater}</p>
                  )}
                </fieldset>

                <fieldset>
                  <legend className="font-semibold">Protein</legend>
                  <input
                    type="number"
                    name="Protein"
                    step="0.01"
                    className="input w-full"
                    value={formData.Protein}
                    onChange={handleChange}
                    placeholder="Kadar Protein"
                  />
                  {errors.Protein && (
                    <p className="text-red-500 text-sm">{errors.Protein}</p>
                  )}
                </fieldset>

                <button
                  type="submit"
                  className="btn w-full mt-4"
                  style={{ backgroundColor: "#56BB89", color: "white" }}
                >
                  Prediksi
                </button>
              </form>
            </div>
          </div>
          <div className="card bg-base-100 p-8  w-full h-fit shadow-2xl">
            <h2 className="text-xl font-bold text-green-900 mb-4">
              Upload File Excel
            </h2>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls"
              className="file-input file-input-bordered w-full"
              onChange={handleFileChange}
            />
            <p className="text-sm mt-2 text-gray-500">
              Format: nama, Fat, AddedWater, Protein
            </p>
            <button
              className="btn mt-4 w-full"
              onClick={handleUpload}
              style={{ backgroundColor: "#56BB89", color: "white" }}
            >
              Prediksi File Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPrediksi;
