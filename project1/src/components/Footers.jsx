import logo from "../assets/images/logo.png";
const Footers = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-primary-content p-10">
      <aside>
        <img src={logo} className="h-20" alt="logo" />
        <p className="font-bold text-black">
          Milkta Gemilang.
          <br />
          Providing reliable tech since 1992
        </p>
        <p className="text-black">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </aside>
    </footer>
  );
};

export default Footers;
