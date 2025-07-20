import a1 from "../assets/images/a1.png";
import a2 from "../assets/images/a2.png";
import a3 from "../assets/images/a3.png";
const About = () => {
  return (
    <div className="hero bg-green-900 min-h-3.5 ">
      <div className="hero-content flex-col lg:flex-row-reverse mt-32 mb-32">
        <ul className="list rounded-box ">
          <li className="list-row">
            <div>
              <img className="size-10 rounded-box" src={a1} />
            </div>
            <div>
              <div className=" mb-2 text-xl text-white font-bold">
                Lebih Cepat
              </div>
              <p className="list-col-wrap text-xm text-white font-medium">
                Proses penilaian hanya dalam <br /> hitungan detik.
              </p>
            </div>
          </li>
          <li className="list-row">
            <div>
              <img className="size-10 rounded-box" src={a2} />
            </div>
            <div>
              <div className="mb-2 text-xl text-white font-bold">
                Lebih Akurat
              </div>
              <p className="list-col-wrap text-xm text-white font-medium">
                Didukung oleh algoritma Random <br /> Forest yang telah diuji.
              </p>
            </div>
          </li>

          <li className="list-row">
            <div>
              <img className="size-10 rounded-box" src={a3} />
            </div>
            <div>
              <div className="mb-2 text-xl text-white font-bold">
                Lebih Efisien
              </div>
              <p className="list-col-wrap text-xm text-white font-medium">
                Semua data tersimpan dalam satu sistem, tanpa <br /> proses
                manual yang memakan waktu.
              </p>
            </div>
          </li>
        </ul>

        <div className="mr-12">
          <h1 className="text-5xl font-bold text-[#E1F396] mb-4">
            Sistem Prediksi Kualitas
          </h1>
          <h4 className="text-xl font-bold text-white mb-2">
            Hindari ketidakkonsistenan dalam kualitas susu!
          </h4>

          <p className="text-xl py-6 text-white">
            Dengan sistem berbasis teknologi Machine Learning, <br />
            Anda dapat menganalisis dan memprediksi kualitas <br /> susu secara
            otomatis berdasarkan parameter seperti <br /> pH, kadar lemak, suhu,
            protein, dan laktosa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
