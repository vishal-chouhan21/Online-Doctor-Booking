import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* ---------- LEFT: LOGO + TITLE ---------- */}
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 cursor-pointer">
        <img
          onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }}
          src={assets.logo}
          alt="Logo"
          className="h-10 w-auto"
        />
        <h1 className="text-xl font-bold text-gray-800">MediCare</h1>
      </div>

      {/* ---------- CENTER LINKS (DESKTOP) ---------- */}
      <ul className="hidden md:flex items-center gap-10 text-gray-700 font-medium absolute left-1/2 transform -translate-x-1/2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-600 transition"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/list-doc/all"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-600 transition"
          }
        >
          All Doctors
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-600 transition"
          }
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-blue-600 border-b-2 border-blue-600 pb-1"
              : "hover:text-blue-600 transition"
          }
        >
          Contact
        </NavLink>
      </ul>

      {/* ---------- RIGHT SIDE (DESKTOP) ---------- */}
      <div className="hidden md:block">
        {token ? (
          <div className="relative group cursor-pointer">
            <img
              src={assets.profile_pic}
              alt="Profile"
              className="h-9 w-9 rounded-full object-cover border border-gray-300 hover:scale-105 transition"
            />

            {/* Dropdown */}
            <div className="absolute top-10 right-0 w-44 bg-white border border-gray-200 shadow-lg rounded-md p-3 z-20 hidden group-hover:block">
              <p
                onClick={() => navigate("/my-profile")}
                className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate("/my-appointment")}
                className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                My Appointment
              </p>
              <p
                onClick={() => setToken(false)}
                className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-red-500"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        )}
      </div>

      {/* ---------- MOBILE MENU BUTTON ---------- */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t md:hidden z-40">
          <ul className="flex flex-col items-center gap-4 py-4 text-gray-700 font-medium">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600 transition"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/list-doc/all"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600 transition"
              }
            >
              All Doctors
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600 transition"
              }
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600 transition"
              }
            >
              Contact
            </NavLink>

            {/* Mobile Profile / Account */}
            {token ? (
              <div className="flex flex-col items-center gap-2 mt-2">
                <img
                  src={assets.profile_pic}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border border-gray-300"
                />

                <p
                  onClick={() => {
                    navigate("/my-profile");
                    closeMenu();
                  }}
                  className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  My Profile
                </p>

                <p
                  onClick={() => {
                    navigate("/my-appointment");
                    closeMenu();
                  }}
                  className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  My Appointment
                </p>

                <p
                  onClick={() => {
                    setToken(false);
                    closeMenu();
                  }}
                  className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer text-red-500"
                >
                  Logout
                </p>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  closeMenu();
                }}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition mt-3"
              >
                Create Account
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
