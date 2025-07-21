import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import logo from "../assets/images/logo.png";
const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin_id");
    setIsLoggedIn(false);
    navigate("/");
  };

  const openLogoutModal = () => {
    document.getElementById("logout_modal").showModal();
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <img src={logo} className="h-12 w-60 mr-4" alt="logo" />
        {isLoggedIn && (
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/mitra">Mitra</Link>
              </li>
              <li>
                <Link to="/prediksi">Prediksi</Link>
              </li>
              <li>
                <Link to="/riwayat">Riwayat</Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {isLoggedIn && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base font-semibold">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/mitra">Mitra</Link>
            </li>
            <li>
              <Link to="/prediksi">Prediksi</Link>
            </li>
            <li>
              <Link to="/riwayat">Riwayat</Link>
            </li>
          </ul>
        </div>
      )}

      <div className="navbar-end">
        {isLoggedIn ? (
          <button
            onClick={openLogoutModal}
            className="px-6 py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: "#B91C1C" }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-10 py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: "#0C4F2B" }}
          >
            Login
          </button>
        )}
        <Modal
          id="logout_modal"
          title="Confirmation"
          message="Apakah Anda yakin ingin logout?"
          onConfirm={handleLogout}
          onCancel={() => console.log("Batal logout")}
        />
      </div>
    </div>
  );
};

export default Header;
