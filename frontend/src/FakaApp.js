import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch /*, useSelector*/ } from "react-redux";
import { getAuth } from "./redux/silces/authSlice";
import { useEffect } from "react";

import Index from "./views";
import Login from "./views/Login";
import Register from "./views/Register";
import Checkout from "./views/Checkout";

import Header from "./components/Header";
import InResturant from "./views/InResturant";
import UserDashboard from "./views/UserDashboard";
import Vendor from "./components/vendor/Vendor";
import VendorOrders from "./components/vendor/routes/VendorOrders";
import VendorMenu from "./components/vendor/routes/VendorMenu";
//import Footer from "./components/Footer";

function App() {
  //const authState = useSelector((state) => state.auth.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/in-resturant" element={<InResturant />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/vendor-dashboard" element={<Vendor />}>
          <Route index element={<VendorOrders />} />
          <Route path="menu" element={<VendorMenu />} />
        </Route>
      </Routes>
      {/*<Footer />*/}
    </BrowserRouter>
  );
}

export default App;
