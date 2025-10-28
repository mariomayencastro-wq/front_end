// src/components/Sidebar.jsx
import { useState } from "react";
import dashboardIcon from "../assets/icons/dashboard.png";

const Sidebar = () => {
  const [active, setActive] = useState("configuracion");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: dashboardIcon },
    { id: "documentos", label: "Documentos", icon: dashboardIcon },
    { id: "clientes", label: "Clientes", icon: dashboardIcon },
    { id: "configuracion", label: "Configuración", icon: dashboardIcon },
  ];

  return (
    <aside
      className="fixed left-0 top-0 h-full w-20 bg-white shadow-md flex flex-col items-center py-6 border-r border-gray-200"
      aria-label="Sidebar"
    >
      <div className="w-full flex justify-center mb-6">
        <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
      </div>

      <nav className="flex flex-col gap-2 w-full px-2">
        {menuItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              aria-pressed={isActive}
              className={
                "flex items-center justify-center w-12 h-12 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 " +
                (isActive
                  ? "bg-white"
                  : "bg-white hover:bg-blue-500")
              }
              style={{
                backgroundColor: isActive ? 'white' : 'white'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = '#0095FF';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'white';
                }
              }}
            >
              <img
                src={item.icon}
                alt={`${item.label} icon`}
                className="w-6 h-6 object-contain"
                aria-hidden="true"
              />
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;