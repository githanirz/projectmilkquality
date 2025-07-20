import hero3 from "../assets/images/hero3.svg";
const HeroSection = () => {
  return (
    <div className="hero bg-green-900 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className=" rounded-xl p-4 ">
          <img src={hero3} className="rounded-max-w-sm rounded-lg" />
        </div>

        <div>
          <h1 className="text-5xl font-bold text-[#E1F396] mb-2">
            Selamat Datang
          </h1>
          <h1 className="text-5xl font-bold text-[#E1F396] mb-2">
            Di Sistem Prediksi
          </h1>
          <h1 className="text-5xl font-bold text-white">Kualitas Susu Bubuk</h1>

          <p className="text-2xl py-6 text-white">
            Sebuah sistem yang membantu prediksi kualitas <br /> susu bubuk yang
            dihasilkan berdasarkan data susu perah.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
