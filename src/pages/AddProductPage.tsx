import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProductPage() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [expiryDate, setExpiryDate] = useState("");

    const navigate = useNavigate(); 


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !category || !expiryDate) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const newProduct = {
            name,
            category,
            quantity,
            expiryDate,
        };

        console.log("Producto añadido:", newProduct);
        alert("Producto añadido correctamente");

        // Resetear formulario
        setName("");
        setCategory("");
        setQuantity(1);
        setExpiryDate("");
    };

    return (
        <div className=" text-white flex flex-col">

            <main className="grow max-w-3xl mx-auto w-full px-6 py-10">
                <h1 className="text-3xl font-bold mb-4">Añadir Producto</h1>
                <p className="text-neutral-400 mb-8">
                    Registra un nuevo alimento para llevar el control de su fecha de caducidad.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 rounded-xl border border-neutral-700 space-y-6">
                    {/* Nombre */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Nombre del producto
                        </label>
                        <input
                            type="text"
                            placeholder="Ej: Leche"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
                        />
                    </div>

                    {/* Categoría */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Categoría</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
                        >
                            <option value="">Selecciona una categoría</option>
                            <option value="Lácteos">Lácteos</option>
                            <option value="Carnes">Carnes</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Frutas">Frutas</option>
                            <option value="Verduras">Verduras</option>
                            <option value="Panadería">Bollería</option>
                            <option value="Otros">Otros</option>
                        </select>
                    </div>

                    {/* Cantidad */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Cantidad</label>
                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
                        />
                    </div>

                    {/* Fecha de caducidad */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Fecha de caducidad
                        </label>
                        <input
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
                        />
                    </div>

                    {/* Botón */}

                    <button
                        type="submit"
                        className="w-full bg-green-600 py-2 rounded-lg text-white font-medium hover:bg-green-700 transition"
                    >
                        Añadir Producto
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="w-full bg-red-700 py-2 rounded-lg text-white font-medium hover:bg-red-800 transition"
                    >
                        Cancelar
                    </button>

                </form>
            </main>
        </div>
    );
}

export default AddProductPage;
