// src/pages/Configuracion.jsx
import Table from "../components/Table";

const Configuracion = () => {
  const columns = [
    { header: "Nombre", accessor: "nombre" },
    { header: "Impuesto", accessor: "impuesto" },
    { header: "Tipo de documento", accessor: "tipo" },
    { header: "Código", accessor: "codigo" },
    { header: "Disminuye valores antes doc", accessor: "disminuye" },
    { header: "Mostrar precios con IVA", accessor: "iva" },
  ];

  const data = [
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
  ];

  return (
    <div className="ml-24 p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Clasificación de Contribuyente
      </h1>
      <Table columns={columns} data={data} />
    </div>
  );
};

export default Configuracion;
