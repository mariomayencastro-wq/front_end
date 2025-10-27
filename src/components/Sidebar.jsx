// src/components/Sidebar.jsx
import { Home, Settings, FileText, Users } from "lucide-react"; // usa tus íconos reales aquí
import { useState } from "react";
import dashboardIcon from "../assets/icons/dashboard.png";


const Sidebar = () => {
  const [active, setActive] = useState("configuracion");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: dashboardIcon },
    { id: "documentos", label: "Documentos", icon: <FileText size={20} /> },
    { id: "clientes", label: "Clientes", icon: <Users size={20} /> },
    { id: "configuracion", label: "Configuración", icon: <Settings size={20} /> },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white shadow-lg flex flex-col items-center py-6 border-r border-gray-200">
      <div className="mb-8">
        <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
      </div>

      <nav className="flex flex-col gap-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex flex-col items-center text-gray-500 hover:text-blue-600 transition ${
              active === item.id ? "text-blue-600" : ""
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
