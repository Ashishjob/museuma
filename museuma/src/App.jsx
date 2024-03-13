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

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/restaurant" element={<Restaurant />} />
      </Routes>
    </Router>
  );
}

export default App;
