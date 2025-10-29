// src/App.jsx
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Configuracion from "./pages/Configuracion";
import POS from "./pages/POS";

function App() {
  const [activeSection, setActiveSection] = useState("dashboard"); // Iniciamos con dashboard

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8FAFE' }}>
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
      <Header />
      <Configuracion activeSection={activeSection} />
      <POS activeSection={activeSection} />
    </div>
  );
}

export default App;
