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
import ManageEmployees from "./adminPages/manageEmployees";
import TotalReport from "./adminPages/totalReport";
import ManageExhibit from "./adminPages/manageExhibits";
import ManageArtwork from "./adminPages/manageArtworks";
import ViewComplaints from "./adminPages/viewComplaints";
import Giftshop from "./pages/giftshop";
import Tickets from "./pages/tickets";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/artworks" element={<Artworks />} />
        <Route path="/giftshop" element={<Giftshop />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/manage-employees" element={<ManageEmployees />} />
        <Route path="/admin/total-report" element={<TotalReport />} />
        <Route path="/admin/manage-exhibits" element={<ManageExhibit />} />
        <Route path="/admin/manage-artworks" element={<ManageArtwork />} />
        <Route path="/admin/view-complaints" element={<ViewComplaints />} />
      </Routes>
    </Router>
  );
}

export default App;
