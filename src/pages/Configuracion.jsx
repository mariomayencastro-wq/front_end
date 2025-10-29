// src/pages/Configuracion.jsx
import { useState } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";

const Configuracion = ({ activeSection }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCatalog, setCurrentCatalog] = useState(null); // Which catalog is being edited
  const [editingIndex, setEditingIndex] = useState(null); // Which row is being edited
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // Which row is selected
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

  // Data for Tipo de Documento
  const [tipoDocumentoData, setTipoDocumentoData] = useState([
    { nombre: "Factura", codigo: "01", descripcion: "Factura de venta" },
    { nombre: "Nota de Crédito", codigo: "04", descripcion: "Nota de crédito" },
  ]);

  // Data for Condición de Pago
  const [condicionPagoData, setCondicionPagoData] = useState([
    { nombre: "Contado", dias: "0", descripcion: "Pago inmediato" },
    { nombre: "30 días", dias: "30", descripcion: "Pago a 30 días" },
  ]);

  // Data for Forma de Pago
  const [formaPagoData, setFormaPagoData] = useState([
    { nombre: "Efectivo", codigo: "01", descripcion: "Pago en efectivo" },
    { nombre: "Tarjeta", codigo: "02", descripcion: "Pago con tarjeta" },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOpenModal = (catalog, index = null) => {
    setCurrentCatalog(catalog);
    setEditingIndex(index);
    
    // If editing, populate form with existing data
    if (index !== null) {
      switch (catalog) {
        case "contribuyente":
          const contribData = data[index];
          setFormData({
            nombre: contribData.nombre,
            impuestosAplicar: contribData.impuesto
          });
          break;
        case "tipoDocumento":
          const tipoDocData = tipoDocumentoData[index];
          setFormData({
            nombre: tipoDocData.nombre,
            codigo: tipoDocData.codigo,
            descripcion: tipoDocData.descripcion
          });
          break;
        case "condicionPago":
          const condPagoData = condicionPagoData[index];
          setFormData({
            nombre: condPagoData.nombre,
            dias: condPagoData.dias,
            descripcion: condPagoData.descripcion
          });
          break;
        case "formaPago":
          const formPagoData = formaPagoData[index];
          setFormData({
            nombre: formPagoData.nombre,
            codigo: formPagoData.codigo,
            descripcion: formPagoData.descripcion
          });
          break;
        default:
          break;
      }
    } else {
      // Reset form for new entry
      setFormData({
        nombre: "",
        impuestosAplicar: "",
        codigo: "",
        descripcion: "",
        dias: ""
      });
    }
    
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nombre.trim()) {
      alert("Por favor, complete el campo de nombre");
      return;
    }

    switch (currentCatalog) {
      case "contribuyente":
        if (!formData.impuestosAplicar.trim()) {
          alert("Por favor, seleccione el impuesto a aplicar");
          return;
        }
        
        if (editingIndex !== null) {
          // Update existing record
          const updatedData = [...data];
          updatedData[editingIndex] = {
            ...updatedData[editingIndex],
            nombre: formData.nombre,
            impuesto: formData.impuestosAplicar
          };
          setData(updatedData);
        } else {
          // Create new record
          const nuevoContribuyente = {
            nombre: formData.nombre,
            impuesto: formData.impuestosAplicar,
            tipo: "Factura",
            codigo: Math.floor(Math.random() * 900000 + 100000).toString(),
            disminuye: "No",
            iva: "No",
          };
          setData(prev => [...prev, nuevoContribuyente]);
        }
        break;

      case "tipoDocumento":
        if (!formData.codigo.trim()) {
          alert("Por favor, complete el campo de código");
          return;
        }
        
        if (editingIndex !== null) {
          const updatedData = [...tipoDocumentoData];
          updatedData[editingIndex] = {
            nombre: formData.nombre,
            codigo: formData.codigo,
            descripcion: formData.descripcion || ""
          };
          setTipoDocumentoData(updatedData);
        } else {
          const nuevoTipoDoc = {
            nombre: formData.nombre,
            codigo: formData.codigo,
            descripcion: formData.descripcion || ""
          };
          setTipoDocumentoData(prev => [...prev, nuevoTipoDoc]);
        }
        break;

      case "condicionPago":
        if (!formData.dias.trim()) {
          alert("Por favor, complete el campo de días");
          return;
        }
        
        if (editingIndex !== null) {
          const updatedData = [...condicionPagoData];
          updatedData[editingIndex] = {
            nombre: formData.nombre,
            dias: formData.dias,
            descripcion: formData.descripcion || ""
          };
          setCondicionPagoData(updatedData);
        } else {
          const nuevaCondicion = {
            nombre: formData.nombre,
            dias: formData.dias,
            descripcion: formData.descripcion || ""
          };
          setCondicionPagoData(prev => [...prev, nuevaCondicion]);
        }
        break;

      case "formaPago":
        if (!formData.codigo.trim()) {
          alert("Por favor, complete el campo de código");
          return;
        }
        
        if (editingIndex !== null) {
          const updatedData = [...formaPagoData];
          updatedData[editingIndex] = {
            nombre: formData.nombre,
            codigo: formData.codigo,
            descripcion: formData.descripcion || ""
          };
          setFormaPagoData(updatedData);
        } else {
          const nuevaForma = {
            nombre: formData.nombre,
            codigo: formData.codigo,
            descripcion: formData.descripcion || ""
          };
          setFormaPagoData(prev => [...prev, nuevaForma]);
        }
        break;

      default:
        break;
    }

    handleCloseModal();
  };
  const handleCloseModal = () => {
    setFormData({ 
      nombre: "", 
      impuestosAplicar: "",
      codigo: "",
      descripcion: "",
      dias: ""
    });
    setIsModalOpen(false);
    setEditingIndex(null);
    setCurrentCatalog(null);
  };

  const handleRowSelect = (catalog, index) => {
    setSelectedRowIndex(index);
    setCurrentCatalog(catalog);
  };

  const handleEdit = () => {
    if (selectedRowIndex !== null && currentCatalog) {
      handleOpenModal(currentCatalog, selectedRowIndex);
      setSelectedRowIndex(null);
    }
  };

  const getModalTitle = () => {
    const action = editingIndex !== null ? "Editar" : "Crear Nuevo";
    switch (currentCatalog) {
      case "contribuyente":
        return `${action} Clasificación de Contribuyente`;
      case "tipoDocumento":
        return `${action} Tipo de Documento`;
      case "condicionPago":
        return `${action} Condición de Pago`;
      case "formaPago":
        return `${action} Forma de Pago`;
      default:
        return action;
    }
  };

  const renderModalContent = () => {
    switch (currentCatalog) {
      case "contribuyente":
        return (
          <>
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
          </>
        );

      case "tipoDocumento":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ""}
                onChange={handleInputChange}
                placeholder="Factura"
                className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 touch-manipulation text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Código
              </label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo || ""}
                onChange={handleInputChange}
                placeholder="01"
                className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 touch-manipulation text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Descripción
              </label>
              <input
                type="text"
                name="descripcion"
                value={formData.descripcion || ""}
                onChange={handleInputChange}
                placeholder="Descripción del tipo de documento"
                className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 touch-manipulation text-base"
              />
            </div>
          </>
        );

      case "condicionPago":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ""}
                onChange={handleInputChange}
                placeholder="Contado"
                className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 touch-manipulation text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Días
              </label>
              <input
                type="number"
                name="dias"
                value={formData.dias || ""}
                onChange={handleInputChange}
                placeholder="0"
                className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 touch-manipulation text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Descripción
              </label>
              <input
                type="text"
                name="descripcion"
                value={formData.descripcion || ""}
                onChange={handleInputChange}
                placeholder="Descripción de la condición de pago"
                className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 touch-manipulation text-base"
              />
            </div>
          </>
        );

      case "formaPago":
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ""}
                onChange={handleInputChange}
                placeholder="Efectivo"
                className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 touch-manipulation text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Código
              </label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo || ""}
                onChange={handleInputChange}
                placeholder="01"
                className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 touch-manipulation text-base"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#333' }}>
                Descripción
              </label>
              <input
                type="text"
                name="descripcion"
                value={formData.descripcion || ""}
                onChange={handleInputChange}
                placeholder="Descripción de la forma de pago"
                className="w-full px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 touch-manipulation text-base"
              />
            </div>
          </>
        );

      default:
        return null;
    }
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
          <div className="px-8 lg:px-8 py-6 lg:py-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 lg:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: '#0095FF' }}>
                Clasificación de Contribuyente
              </h2>
              <div className="flex gap-2">
                {/* Icono de Editar */}
                <button
                  onClick={handleEdit}
                  disabled={selectedRowIndex === null || currentCatalog !== "contribuyente"}
                  className={`p-2 rounded-lg transition-colors touch-manipulation ${
                    selectedRowIndex !== null && currentCatalog === "contribuyente"
                      ? 'hover:opacity-90'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
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

            <Table 
              columns={columns} 
              data={data} 
              onRowSelect={(index) => handleRowSelect("contribuyente", index)}
              selectedRowIndex={currentCatalog === "contribuyente" ? selectedRowIndex : null}
            />
            
            {/* Agregar Nuevo Contribuyente */}
            <div className="mt-6 lg:mt-8">
              <button
                onClick={() => handleOpenModal("contribuyente")}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition font-medium px-4 py-3 sm:py-2 rounded-lg border border-gray-300 touch-manipulation min-h-[44px]"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <span className="text-xl">⊕</span>
                Agregar Nuevo Contribuyente
              </button>
            </div>
          </div>

          {/* Sección de Tipo de Documento */}
          <div className="px-8 lg:px-8 py-6 lg:py-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 lg:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: '#0095FF' }}>
                Tipo de Documento
              </h2>
              <div className="flex gap-2">
                {/* Icono de Editar */}
                <button
                  onClick={handleEdit}
                  disabled={selectedRowIndex === null || currentCatalog !== "tipoDocumento"}
                  className={`p-2 rounded-lg transition-colors touch-manipulation ${
                    selectedRowIndex !== null && currentCatalog === "tipoDocumento"
                      ? 'hover:opacity-90'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                  style={{ backgroundColor: '#F7FAFF' }}
                  aria-label="Editar tipo de documento"
                  title="Editar tipo de documento"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                
                {/* Icono de Eliminar */}
                <button
                  className="p-2 rounded-lg hover:opacity-90 transition-colors touch-manipulation"
                  style={{ backgroundColor: '#F7FAFF' }}
                  aria-label="Eliminar tipo de documento"
                  title="Eliminar tipo de documento"
                >
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <Table 
              columns={[
                { header: "Nombre", accessor: "nombre" },
                { header: "Código", accessor: "codigo" },
                { header: "Descripción", accessor: "descripcion" }
              ]} 
              data={tipoDocumentoData}
              onRowSelect={(index) => handleRowSelect("tipoDocumento", index)}
              selectedRowIndex={currentCatalog === "tipoDocumento" ? selectedRowIndex : null}
            />
            
            {/* Agregar Nuevo Tipo de Documento */}
            <div className="mt-6 lg:mt-8">
              <button
                onClick={() => handleOpenModal("tipoDocumento")}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition font-medium px-4 py-3 sm:py-2 rounded-lg border border-gray-300 touch-manipulation min-h-[44px]"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <span className="text-xl">⊕</span>
                Agregar Nuevo Tipo de Documento
              </button>
            </div>
          </div>

          {/* Sección de Condición de Pago */}
          <div className="px-8 lg:px-8 py-6 lg:py-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 lg:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: '#0095FF' }}>
                Condición de Pago
              </h2>
              <div className="flex gap-2">
                {/* Icono de Editar */}
                <button
                  onClick={handleEdit}
                  disabled={selectedRowIndex === null || currentCatalog !== "condicionPago"}
                  className={`p-2 rounded-lg transition-colors touch-manipulation ${
                    selectedRowIndex !== null && currentCatalog === "condicionPago"
                      ? 'hover:opacity-90'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                  style={{ backgroundColor: '#F7FAFF' }}
                  aria-label="Editar condición de pago"
                  title="Editar condición de pago"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                
                {/* Icono de Eliminar */}
                <button
                  className="p-2 rounded-lg hover:opacity-90 transition-colors touch-manipulation"
                  style={{ backgroundColor: '#F7FAFF' }}
                  aria-label="Eliminar condición de pago"
                  title="Eliminar condición de pago"
                >
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <Table 
              columns={[
                { header: "Nombre", accessor: "nombre" },
                { header: "Días", accessor: "dias" },
                { header: "Descripción", accessor: "descripcion" }
              ]} 
              data={condicionPagoData}
              onRowSelect={(index) => handleRowSelect("condicionPago", index)}
              selectedRowIndex={currentCatalog === "condicionPago" ? selectedRowIndex : null}
            />
            
            {/* Agregar Nueva Condición de Pago */}
            <div className="mt-6 lg:mt-8">
              <button
                onClick={() => handleOpenModal("condicionPago")}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition font-medium px-4 py-3 sm:py-2 rounded-lg border border-gray-300 touch-manipulation min-h-[44px]"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <span className="text-xl">⊕</span>
                Agregar Nueva Condición de Pago
              </button>
            </div>
          </div>

          {/* Sección de Forma de Pago */}
          <div className="px-8 lg:px-8 py-6 lg:py-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 lg:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: '#0095FF' }}>
                Forma de Pago
              </h2>
              <div className="flex gap-2">
                {/* Icono de Editar */}
                <button
                  onClick={handleEdit}
                  disabled={selectedRowIndex === null || currentCatalog !== "formaPago"}
                  className={`p-2 rounded-lg transition-colors touch-manipulation ${
                    selectedRowIndex !== null && currentCatalog === "formaPago"
                      ? 'hover:opacity-90'
                      : 'opacity-40 cursor-not-allowed'
                  }`}
                  style={{ backgroundColor: '#F7FAFF' }}
                  aria-label="Editar forma de pago"
                  title="Editar forma de pago"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                
                {/* Icono de Eliminar */}
                <button
                  className="p-2 rounded-lg hover:opacity-90 transition-colors touch-manipulation"
                  style={{ backgroundColor: '#F7FAFF' }}
                  aria-label="Eliminar forma de pago"
                  title="Eliminar forma de pago"
                >
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            <Table 
              columns={[
                { header: "Nombre", accessor: "nombre" },
                { header: "Código", accessor: "codigo" },
                { header: "Descripción", accessor: "descripcion" }
              ]} 
              data={formaPagoData}
              onRowSelect={(index) => handleRowSelect("formaPago", index)}
              selectedRowIndex={currentCatalog === "formaPago" ? selectedRowIndex : null}
            />
            
            {/* Agregar Nueva Forma de Pago */}
            <div className="mt-6 lg:mt-8">
              <button
                onClick={() => handleOpenModal("formaPago")}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition font-medium px-4 py-3 sm:py-2 rounded-lg border border-gray-300 touch-manipulation min-h-[44px]"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <span className="text-xl">⊕</span>
                Agregar Nueva Forma de Pago
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
        title={getModalTitle()}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderModalContent()}
          
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