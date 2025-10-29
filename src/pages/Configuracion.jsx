// src/pages/Configuracion.jsx
import { useState } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";

const Configuracion = ({ activeSection }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    impuestosAplicar: ""
  });

  const columns = [
    { header: "Nombre", accessor: "nombre" },
    { header: "Impuesto", accessor: "impuesto" },
    { header: "Tipo de documento", accessor: "tipo" },
    { header: "Código", accessor: "codigo" },
    { header: "Disminuye valores antes doc", accessor: "disminuye" },
    { header: "Mostrar precios con IVA", accessor: "iva" },
  ];

  const [data, setData] = useState([
    {
      nombre: "Contribuyente 1",
      impuesto: "12%",
      tipo: "Factura",
      codigo: "235678",
      disminuye: "Sí",
      iva: "No",
    },
    {
      nombre: "Contribuyente 2",
      impuesto: "12%",
      tipo: "Factura",
      codigo: "235678",
      disminuye: "Sí",
      iva: "No",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim() || !formData.impuestosAplicar.trim()) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }

    // Crear nuevo contribuyente con valores por defecto
    const nuevoContribuyente = {
      nombre: formData.nombre,
      impuesto: formData.impuestosAplicar,
      tipo: "Factura", // Valor por defecto
      codigo: Math.floor(Math.random() * 900000 + 100000).toString(), // Código aleatorio
      disminuye: "No", // Valor por defecto
      iva: "No", // Valor por defecto
    };

    setData(prev => [...prev, nuevoContribuyente]);
    
    // Limpiar formulario y cerrar modal
    setFormData({ nombre: "", impuestosAplicar: "" });
    setIsModalOpen(false);
  };
  const handleCloseModal = () => {
    setFormData({ nombre: "", impuestosAplicar: "" });
    setIsModalOpen(false);
  };

  // No renderizar nada si la sección activa es POS
  if (activeSection === "pos") return null;

  return (
    <div className="lg:ml-28 lg:-mr-8 pt-28 lg:pt-32 p-4 sm:p-6 lg:p-8 min-h-screen">
      {/* Mostrar contenido solo si la sección de configuración está activa */}
      {activeSection === "configuracion" ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-w-none">
          {/* Header con título Configuración y botón Exportar */}
          <div className="flex justify-between items-center px-8 lg:px-8 py-6 lg:py-8 border-b border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: '#000000' }}>
              Configuración
            </h2>
            <button
              className="px-4 py-3 sm:py-2 rounded-lg text-gray-600 font-medium hover:opacity-90 transition border border-gray-300 touch-manipulation min-h-[44px]"
              style={{ backgroundColor: '#F7FAFF' }}
            >
              📤 Exportar
            </button>
          </div>

          {/* Sección de Clasificación de Contribuyente */}
          <div className="px-8 lg:px-8 py-6 lg:py-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 lg:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: '#0095FF' }}>
                Clasificación de Contribuyente
              </h2>
              <div className="flex gap-2">
                {/* Icono de Editar */}
                <button
                  className="p-2 rounded-lg hover:opacity-90 transition-colors touch-manipulation"
                  style={{ backgroundColor: '#F7FAFF' }}
                  aria-label="Editar configuración"
                  title="Editar configuración"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                
                {/* Icono de Eliminar */}
                <button
                  className="p-2 rounded-lg hover:opacity-90 transition-colors touch-manipulation"
                  style={{ backgroundColor: '#F7FAFF' }}
                  aria-label="Eliminar configuración"
                  title="Eliminar configuración"
                >
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <Table columns={columns} data={data} />
            
            {/* Agregar Nuevo Contribuyente */}
            <div className="mt-6 lg:mt-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition font-medium px-4 py-3 sm:py-2 rounded-lg border border-gray-300 touch-manipulation min-h-[44px]"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <span className="text-xl">⊕</span>
                Agregar Nuevo Contribuyente
              </button>
            </div>
          </div>
        </div>
      ) : activeSection === "dashboard" || activeSection === "catalogo" || activeSection === "ayuda" ? (
        /* Mostrar contenido en blanco para secciones sin componente específico */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8 max-w-none min-h-[400px] flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-semibold mb-2">Sección en Desarrollo</h2>
            <p className="text-sm">Esta sección estará disponible próximamente</p>
          </div>
        </div>
      ) : null}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Crear Nuevo Clasificación de Contribuyente"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Gran Contribuyente"
              className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 touch-manipulation text-base"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
              Impuestos a aplicar
            </label>
            <select
              name="impuestosAplicar"
              value={formData.impuestosAplicar}
              onChange={handleInputChange}
              className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-500 touch-manipulation text-base"
              required
            >
              <option value="">Seleccionar</option>
              <option value="0%">0% - Exento</option>
              <option value="12%">12% - IVA General</option>
              <option value="15%">15% - IVA Especial</option>
            </select>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 sm:py-2 rounded-lg text-white font-medium hover:opacity-90 transition flex items-center gap-2 touch-manipulation"
              style={{ backgroundColor: '#0095FF' }}
            >
              <span>💾</span>
              Guardar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Configuracion;