import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../database/supabase/Client";

function AddProductPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [expiryDate, setExpiryDate] = useState("");

    const id_perfil = 1; 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !category || !expiryDate) {
            alert("Completa todos los campos.");
            return;
        }

        // OBTENER ID_CATEGORIA desde la tabla categorias
        const { data: categoriaData, error: catError } = await supabase
            .from("categorias")
            .select("id_categoria")
            .eq("nombre", category)
            .single();

        if (catError || !categoriaData) {
            alert("La categoría no existe en la base de datos.");
            return;
        }

        const id_categoria = categoriaData.id_categoria;

        // buscar si el producto ya existe en productos
        const { data: productoExistente } = await supabase
            .from("productos")
            .select("id_producto")
            .eq("nombre", name)
            .eq("id_categoria", id_categoria)
            .single();

        let id_producto: number;

        if (productoExistente) {
            id_producto = productoExistente.id_producto;
        } else {
            // producto en productos si no existe
            const { data: nuevoProducto, error: productoError } = await supabase
                .from("productos")
                .insert([
                    { nombre: name, id_categoria }
                ])
                .select()
                .single();

            if (productoError || !nuevoProducto) {
                alert("Error al crear el producto.");
                return;
            }

            id_producto = nuevoProducto.id_producto;
        }

        // registro del usuario en usuario_productos
        const { error: usuarioProdError } = await supabase
            .from("usuario_productos")
            .insert([
                {
                    id_perfil,
                    id_producto,
                    cantidad: quantity,
                    fecha_caducidad: expiryDate,
                    estado: "pendiente",
                }
            ]);

        if (usuarioProdError) {
            alert("Error al guardar en tu inventario.");
            return;
        }

        alert("Producto añadido correctamente");
        navigate("/products");
    };

    return (
        <div className="text-white">
            <main className="max-w-3xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Añadir Producto</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nombre */}
                    <input
                        type="text"
                        placeholder="Nombre del producto"
                        className="w-full p-2 rounded bg-neutral-700"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* Categoría */}
                    <select
                        className="w-full p-2 rounded bg-neutral-700"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Selecciona categoría</option>
                        <option value="Lácteos">Lácteos</option>
                        <option value="Carnes">Carnes</option>
                        <option value="Frutas">Frutas</option>
                        <option value="Verduras">Verduras</option>
                        <option value="Panadería">Panadería</option>
                        <option value="Bebidas">Bebidas</option>
                    </select>

                    {/* Cantidad */}
                    <input
                        type="number"
                        min={1}
                        className="w-full p-2 rounded bg-neutral-700"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />

                    {/* Fecha de caducidad */}
                    <input
                        type="date"
                        className="w-full p-2 rounded bg-neutral-700"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />

                    {/* Botones */}
                    <div className="flex gap-4">
                        <button className="flex-1 bg-green-600 py-2 rounded" onClick={() => navigate("/products")}>
                            Añadir Producto
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/products")}
                            className="flex-1 bg-red-700 py-2 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AddProductPage;