// src/App.jsx
import Sidebar from "./components/Sidebar";
import Configuracion from "./pages/Configuracion";

function App() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Configuracion />
      </div>
    </div>
  );
}

export default App;
