const ProductCard = () => {
  return (
    <div className="flex flex-col w-87.5 bg-[#E5E7EB] rounded-3xl p-6 font-sans shadow-sm">
      {/* Contenedor de la imagen */}
      <div className="bg-[#F3F4F6] rounded-2xl h-48 flex items-center justify-center mb-6 overflow-hidden">
        <div className="relative flex flex-col items-center">
          {/* Aquí iría la imagen */}

        </div>
      </div>

      {/* Información del producto */}
      <div className="flex justify-between items-start mb-1">
        <h2 className="text-[#1F2937] text-xl font-bold">Leche Entera</h2>
        <span className="text-[#EF4444] text-sm font-medium mt-1">
          Caduca hoy
        </span>
      </div>
      
      <p className="text-[#6B7280] text-lg mb-4">Lácteos</p>

      {/* Fecha de caducidad */}
      <div className="flex items-center text-[#374151] mb-6">
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="font-medium">Caduca: 29/01/2026</span>
      </div>

      {/* Botón Eliminar */}
      <button className="w-full bg-[#FEE2E2] hover:bg-[#FECACA] transition-colors py-4 rounded-2xl flex items-center justify-center gap-2 text-[#EF4444] font-semibold text-lg">
        <svg 
          className="w-5 h-5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        Eliminar
      </button>
    </div>
  );
};

export default ProductCard;