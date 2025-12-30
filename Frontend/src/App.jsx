import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import ListDoc from "./pages/ListDoc";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Policy from "./pages/Private-Policy";
import Register from "./pages/Register";
import AppContextProvider from "./context/AppContext";

const App = () => {
  return (
    <div>
      <AppContextProvider>
        <Toaster />
        <Navbar />
        <Routes>
          {/* Home page is now public */}
          <Route path="/" element={<Home />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Policy />} />
          <Route path="/list-doc/:speciality" element={<ListDoc />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-appointment" element={<MyAppointment />} />

          {/* Protected route – only Appointment */}
          <Route path="/appointment/:docID" element={<Appointment />} />
        </Routes>

        <Footer />
      </AppContextProvider>
    </div>
  );
};

export default App;
