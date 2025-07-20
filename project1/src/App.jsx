import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MitraPage from "./pages/MitraPage";
import AddMitra from "./components/AddMitra";
import EditMitra from "./components/EditMitra";
import AddPrediksi from "./components/AddPrediksi";
import PrediksiPage from "./pages/PrediksiPage";
import RiwayatPage from "./pages/RiwayatPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mitra" element={<MitraPage />} />
        <Route path="/addmitra" element={<AddMitra />} />
        <Route path="/editmitra/:id" element={<EditMitra />} />
        <Route path="/prediksi" element={<AddPrediksi />} />
        <Route path="/prediksi-hasil" element={<PrediksiPage />} />
        <Route path="/riwayat" element={<RiwayatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
