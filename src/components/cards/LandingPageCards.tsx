const LandingPageCards = () => {
  return (
    <div className="bg-[#121212] p-10 flex flex-col md:flex-row justify-center items-center gap-8">
      
      {/* CARTA 1: ALERTAS */}
      <div className="bg-[#E0F7FA] w-[320px] rounded-[40px] p-8 shadow-lg">
        {/* Imagen */}
        <div className="w-full h-48 rounded-2xl mb-8 bg-gray-300 flex items-center justify-center overflow-hidden">
          <span className="text-gray-500 text-sm italic">Imagen App</span>
        </div>
        {/* Icono */}
        <div className="bg-[#29B6F6] w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
        </div>
        <h3 className="text-black text-2xl font-bold mb-4"> Texto aquí</h3>
        <p className="text-gray-700 text-lg">
          Texto aquí
        </p>
      </div>

      {/* CARTA 2: DESPENSA */}
      <div className="bg-[#FCE4EC] w-[320px] rounded-[40px] p-8 shadow-lg">
        {/* Imagen */}
        <div className="w-full h-48 rounded-2xl mb-8 bg-gray-300 flex items-center justify-center overflow-hidden">
          <span className="text-gray-500 text-sm italic">Imagen Nevera</span>
        </div>
        {/* Icono */}
        <div className="bg-[#EC407A] w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
        <h3 className="text-black text-2xl font-bold mb-4"> Texto aquí</h3>
        <p className="text-gray-700 text-lg">
           Texto aquí
        </p>
      </div>

      {/* CARTA 3: AHORRO */}
      <div className="bg-[#FFF8E1] w-[320px] rounded-[40px] p-8 shadow-lg">
        {/* Imagen */}
        <div className="w-full h-48 rounded-2xl mb-8 bg-gray-300 flex items-center justify-center overflow-hidden">
          <span className="text-gray-500 text-sm italic">Imagen Ahorro</span>
        </div>
        {/* Icono */}
        <div className="bg-[#FFA726] w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 7h-9c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
        <h3 className="text-black text-2xl font-bold mb-4"> Texto aquí</h3>
        <p className="text-gray-700 text-lg">
           Texto aquí
        </p>
      </div>

    </div>
  );
};

export default LandingPageCards;