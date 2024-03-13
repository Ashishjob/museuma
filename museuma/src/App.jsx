import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import Restaurant from "./pages/restaurant";
import Complaints from "./pages/complaints";
import Artworks from "./pages/artworks";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/artworks" element={<Artworks />} />
      </Routes>
    </Router>
  );
}

export default App;
