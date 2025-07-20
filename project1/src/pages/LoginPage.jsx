import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { signInWithPopup, auth, provider } from "../firebase";
import herologin from "../assets/images/herologin.svg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errorMessages = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email) {
      errorMessages.email = "Email wajib diisi.";
    } else if (!emailRegex.test(email)) {
      errorMessages.email = "Format email tidak valid.";
    }
    if (!password) {
      errorMessages.password = "Password wajib diisi.";
    }
    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const handleManualLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await axios.post("http://localhost:5000/manual-login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin_id", res.data.admin_id);
      navigate("/");
    } catch {
      alert("Login manual gagal.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleEmail = result.user.email;
      const res = await axios.post("http://localhost:5000/google-login", {
        email: googleEmail,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch {
      alert("Login Google gagal.");
    }
  };

  return (
    <div className="hero min-h-3.5 mt-24">
      <div className="hero-content flex-col lg:flex-row justify-between w-full px-10 lg:px-20">
        <div className="w-full lg:w-1/2 text-left mb-10 lg:mb-0">
          <img src={herologin} className="max-w-64 " />
          <h1 className="text-4xl font-bold text-green-900 mb-4">
            Milk Quality Control
          </h1>
          <p className="font-bold text-2xl">Welcome back!</p>
          <p className="font-semibold text-md mt-2">
            Mulai lakukan Prediksi Kualitas Susu Bubuk Berdasarkan Data Susu
            Perah Dengan Otomatis.
          </p>
        </div>
        <div className="card w-full max-w-md bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Login Admin</h2>

          <form onSubmit={handleManualLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <button
              className="btn btn-primary w-full bg-green-900"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="divider">atau</div>

          <button
            className="btn bg-white text-black border-[#e5e5e5] w-full"
            onClick={handleGoogleLogin}
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login dengan Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
