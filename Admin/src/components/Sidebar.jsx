import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  CalendarCheck,
  Settings,
  Phone,
  PowerIcon,
  ActivitySquareIcon,
} from "lucide-react";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Doctors", path: "/doctors", icon: <Stethoscope size={20} /> },
    { name: "All Appointments", path: "/appointment", icon: <CalendarCheck size={20} /> },
    { name: "Active Appointments", path: "/active-appointment", icon: <ActivitySquareIcon size={20} /> },
  ];

  const bottomItems = [
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    { name: "Help & Support", path: "/support", icon: <Phone size={20} /> },
     { name: "Logout", path: "/logout", icon: <PowerIcon size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 shadow-md fixed left-0 top-0 flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4 mt-2">
        <div className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-sm">
          P
        </div>
        <h1 className="text-xl font-bold text-gray-800">
          Prescripto
        </h1>
      </div>

      {/* Top Menu */}
      <ul className="mt- px-4 space-y-2 flex-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all
                ${
                  pathname === item.path
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50"
                }
              `}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Bottom Menu */}
      <ul className="px-4 pb-6 space-y-2">
        {bottomItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all
                ${
                  pathname === item.path
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 hover:bg-blue-50"
                }
              `}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
