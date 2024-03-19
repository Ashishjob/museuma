import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import AdminHome from "./adminPages/Home";
import Dining from "./pages/dining";
import Complaints from "./pages/complaints";
import Artworks from "./pages/artworks";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/dining" element={<Dining />} />
        <Route oath="/artworks" element={<Artworks />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </Router>
  );
}

export default App;
