import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Globe,
  Maximize,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-64 right-0
    bg-white shadow-sm border-b border-gray-200
    px-6 py-4 flex items-center justify-between z-30">

      {/* LEFT SIDE (Logo + Search + Toggle) */}
      <div className="flex items-center gap-4">

        {/* Search Bar */}
        <div className="relative hidden sm:block ml-30">
          <input
            type="text"
            placeholder="Search"
            className="w-64 md:w-80 pl-10 pr-4 py-2 bg-[#F1F5F9] rounded-xl focus:outline-none 
            focus:ring-2 focus:ring-blue-300 shadow-sm text-sm"
          />
          <Search size={16} className="absolute top-2.5 left-4 text-gray-500" />
        </div>

      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* Search icon for mobile */}
        <button className="sm:hidden p-2 hover:bg-gray-100 rounded-full">
          <Search size={20} />
        </button>

        {/* Notification */}
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell size={20} />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] 
            w-4 h-4 rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        {/* Language */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Globe size={20} />
        </button>

        {/* Fullscreen */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Maximize size={20} />
        </button>

        {/* Profile */}
        <div className="relative group cursor-pointer">
        <img
          onClick={() => navigate("/my-profile")}
          src="https://img.freepik.com/premium-vector/male-avatar-flat-icon-design-vector-illustration_549488-103.jpg"
          className="w-9 h-9 rounded-full border border-gray-300 cursor-pointer"
        />
        </div>
      </div>
    </nav>
  );
}
