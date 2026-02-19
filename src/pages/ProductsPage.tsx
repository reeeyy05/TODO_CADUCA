import { useState } from "react";
import { Link } from "react-router-dom";

// Tipo de producto
interface Product {
    id: number;
    name: string;
    category: string;
    expiry: string;
    status: string;
    image: string;
}

function ProductsPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    // Lista inicial vacía
    const [products, setProducts] = useState<Product[]>([]);

    return (
        <div className="min-h-screen text-white flex flex-col">
            {/* CONTENIDO PRINCIPAL */}
            <main className="grow max-w-6xl mx-auto w-full px-6 py-10">

                <h1 className="text-3xl font-bold mb-2">Mis Productos</h1>
                <p className="text-neutral-400 mb-6">
                    Gestiona tus productos y fechas de caducidad.
                </p>

                {/* FILTROS */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white"
                    />

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white"
                    >
                        <option value="">Todas las categorías</option>
                        <option value="Lácteos">Lácteos</option>
                        <option value="Carnes">Carnes</option>
                        <option value="Frutas">Frutas</option>
                        <option value="Verduras">Verduras</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Panadería">Panadería</option>
                    </select>

                    <Link
                        to="/addProducts"
                        className="bg-green-600 px-4 py-2 rounded-md text-white font-medium hover:bg-green-700 transition"
                    >
                        + Añadir Producto
                    </Link>
                </div>

                {/* GRID */}
                {products.length === 0 ? (
                    <p className="text-neutral-400 mt-6">
                        No hay productos todavía. Añade uno para empezar.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((item) => (
                            <div
                                key={item.id}
                                className="bg-neutral-800 p-4 border border-neutral-700 rounded-xl"
                            >
                                <div className="w-full h-32 bg-neutral-700 rounded-md mb-3"></div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-neutral-400">{item.category}</p>
                                    </div>

                                    <span className="text-sm text-red-400">{item.status}</span>
                                </div>

                                <p className="text-sm text-neutral-400 mt-2">
                                    Caduca: {item.expiry}
                                </p>

                                <button className="w-full bg-red-900/40 text-red-400 mt-4 py-2 rounded-md hover:bg-red-900/60 transition">
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

                    <div className="bg-neutral-700 p-4 rounded-xl border border-neutral-800">
                        <h3 className="font-semibold">Productos por Caducar</h3>
                        <p className="text-3xl font-bold mt-2 text-red-400">0</p>
                        <p className="text-sm text-neutral-400">—</p>
                    </div>

                    <div className="bg-neutral-700 p-4 rounded-xl border border-neutral-800">
                        <h3 className="font-semibold">Próximos a Caducar</h3>
                        <p className="text-3xl font-bold mt-2 text-yellow-300">0</p>
                        <p className="text-sm text-neutral-400">—</p>
                    </div>

                    <div className="bg-neutral-700 p-4 rounded-xl border border-neutral-800">
                        <h3 className="font-semibold">Total de Productos</h3>
                        <p className="text-3xl font-bold mt-2 text-blue-400">{products.length}</p>
                        <p className="text-sm text-neutral-400">En el inventario</p>
                    </div>

                </div>
            </main>

        </div>
    );
}

export default ProductsPage;
