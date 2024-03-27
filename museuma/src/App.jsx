import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "./index.css";
import Home from "./pages/Home";
import Dining from "./pages/dining";
import Complaints from "./pages/complaints";
import Artworks from "./pages/artworks";
import Exhibits from "./pages/exhibits";
import Giftshop from "./pages/giftshop";
import Tickets from "./pages/tickets";
import ShoppingCart from "./pages/shoppingCart";
import Checkout from "./pages/checkout";
import AdminHome from "./adminPages/Home";
import ManageEmployees from "./adminPages/manageEmployees";
import TotalReport from "./adminPages/totalReport";
import ManageExhibit from "./adminPages/manageExhibits";
import ManageArtwork from "./adminPages/manageArtworks";
import ViewComplaints from "./adminPages/viewComplaints";
import ManageGiftshop from "./adminPages/manageGiftshop";
import EditProfile from "./pages/editProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/giftshop" element={<Giftshop />} />
        <Route path="/exhibits" element={<Exhibits />} />
        <Route path="/artworks" element={<Artworks />} />
        <Route path="/exhibits" element={<Exhibits />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/manage-employees" element={<ManageEmployees />} />
        <Route path="/admin/total-report" element={<TotalReport />} />
        <Route path="/admin/manage-exhibits" element={<ManageExhibit />} />
        <Route path="/admin/manage-artworks" element={<ManageArtwork />} />
        <Route path="/admin/view-complaints" element={<ViewComplaints />} />
        <Route path="/admin/manage-giftshop" element={<ManageGiftshop />} />
      </Routes>
    </Router>
  );
}

export default App;
