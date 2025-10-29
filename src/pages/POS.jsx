// src/pages/POS.jsx
import React from 'react';
import bagIcon from '../assets/img/bag.png';

const POS = ({ activeSection }) => {
  if (activeSection !== "pos") return null;

  return (
    <div className="lg:ml-28 pt-28 lg:pt-32 p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 max-w-none w-full">
        {/* Header POS */}
        <div className="flex justify-center items-center px-20 lg:px-110 py-6 lg:py-8 border-b border-gray-100 "style={{ backgroundColor: '#ffffffff' }}>
          <div className="flex-1"></div>
          <h2 className="text-2xl sm:text-3xl font-semibold" style={{ color: '#000000' }}>
            Punto de venta  (POS)                          
          </h2>
          <div className="flex-1 flex justify-end">
            <button
              className="px-4 py-3 sm:py-2 rounded-lg text-gray-600 font-medium hover:opacity-90 transition border border-gray-300 touch-manipulation min-h-[44px]"
              style={{ backgroundColor: '#F7FAFF' }}
            >
            </button>
          </div>
        </div>

        {/* Contenido Central - Estado Vacío */}
        <div className="flex flex-col items-center justify-center min-h-[500px] px-8 py-16 lg:py-24">
          {/* Icono de bolsa de compras */}
          <div className="mb-12">
            <img 
              src={bagIcon} 
              alt="Bolsa de compras" 
              className="w-32 h-32 lg:w-40 lg:h-40 mx-auto object-contain"
            />
          </div>

          {/* Mensaje principal */}
          <h3 className="text-2xl lg:text-3xl font-semibold mb-6 text-center" style={{ color: '#0095FF' }}>
            Sin pedidos por el momento.
          </h3>

          {/* Mensaje secundario */}
          <p className="text-gray-500 mb-12 text-center text-lg lg:text-xl max-w-md">
            ¿Quieres realizar uno ahora?
          </p>

          {/* Botón Nueva venta */}
          <button
            className="px-8 py-4 rounded-lg font-medium hover:opacity-90 transition touch-manipulation min-h-[48px] flex items-center gap-3 text-white text-lg"
            style={{ backgroundColor: '#0095FF' }}
          >
            <span className="text-xl font-bold">+</span>
            Nueva venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;