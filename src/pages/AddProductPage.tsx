import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { createCategoryRepository, createProductRepository } from "../database/repositories";
import { supabase } from "../database/supabase/Client";
import type { Categoria } from "../interfaces/Categoria";

function AddProductPage() {
    const navigate = useNavigate();
    const { perfil } = useAuthStore();

    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState<number | "">("");
    const [quantity, setQuantity] = useState(1);
    const [expiryDate, setExpiryDate] = useState("");
    const [categories, setCategories] = useState<Categoria[]>([]);
    const [loadingCats, setLoadingCats] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const categoryRepo = useMemo(() => createCategoryRepository(), []);
    const productRepo = useMemo(() => createProductRepository(), []);

    // Cargar categorías desde Supabase
    useEffect(() => {
        async function load() {
            setLoadingCats(true);
            const { data } = await categoryRepo.getCategories();
            if (data) setCategories(data);
            setLoadingCats(false);
        }
        load();
    }, [categoryRepo]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim()) { setError("Introduce el nombre del producto."); return; }
        if (!categoryId) { setError("Selecciona una categoría."); return; }
        if (!expiryDate) { setError("Selecciona la fecha de caducidad."); return; }
        if (quantity < 1) { setError("La cantidad mínima es 1."); return; }
        if (!perfil) { setError("No hay sesión activa. Inicia sesión de nuevo."); return; }

        setSubmitting(true);

        try {
            // Buscar si el producto ya existe en el catálogo
            const { data: existente } = await supabase
                .from("productos")
                .select("id_producto")
                .eq("nombre", name.trim())
                .eq("id_categoria", categoryId)
                .maybeSingle();

            let id_producto: number;

            if (existente) {
                id_producto = existente.id_producto;
            } else {
                // Crear producto en el catálogo
                const { data: nuevo, error: prodErr } = await supabase
                    .from("productos")
                    .insert({ nombre: name.trim(), id_categoria: categoryId })
                    .select("id_producto")
                    .single();

                if (prodErr || !nuevo) {
                    console.error("Error INSERT productos:", prodErr);
                    setError(
                        prodErr?.code === "42501" || prodErr?.message?.includes("policy")
                            ? "Sin permisos para crear productos. Verifica las políticas RLS en Supabase."
                            : `Error al crear el producto: ${prodErr?.message ?? "desconocido"}`
                    );
                    setSubmitting(false);
                    return;
                }
                id_producto = nuevo.id_producto;
            }

            // Insertar en usuario_productos
            const { error: insertErr } = await productRepo.createUserProduct({
                id_perfil: perfil.id_perfil,
                id_producto,
                cantidad: quantity,
                fecha_caducidad: expiryDate,
            });

            if (insertErr) {
                setError("Error al guardar el producto en tu inventario.");
                setSubmitting(false);
                return;
            }

            navigate("/products");
        } catch {
            setError("Error inesperado. Inténtalo de nuevo.");
            setSubmitting(false);
        }
    };

    // Fecha mínima: hoy
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="text-white">
            <main className="max-w-lg mx-auto px-6 py-10">
                {/* Cabecera */}
                <button onClick={() => navigate("/products")} className="flex items-center gap-2 text-neutral-400 hover:text-white transition mb-6">
                    <ArrowLeft size={18} /> Volver a mis productos
                </button>

                <h1 className="text-3xl font-bold mb-2">Añadir Producto</h1>
                <p className="text-neutral-400 mb-8">Registra un nuevo producto en tu inventario.</p>

                {/* Error */}
                {error && (
                    <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nombre */}
                    <div>
                        <label htmlFor="product-name" className="block text-sm font-medium text-neutral-300 mb-1">
                            Nombre del producto
                        </label>
                        <input
                            id="product-name"
                            type="text"
                            placeholder="Ej: Leche entera"
                            className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={100}
                        />
                    </div>

                    {/* Categoría */}
                    <div>
                        <label htmlFor="product-category" className="block text-sm font-medium text-neutral-300 mb-1">
                            Categoría
                        </label>
                        {loadingCats ? (
                            <div className="flex items-center gap-2 text-neutral-400 text-sm py-2">
                                <Loader2 size={16} className="animate-spin" /> Cargando categorías...
                            </div>
                        ) : (
                            <select
                                id="product-category"
                                className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : "")}
                            >
                                <option value="">Selecciona categoría</option>
                                {categories.map((c) => (
                                    <option key={c.id_categoria} value={c.id_categoria}>
                                        {c.nombre}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Cantidad */}
                    <div>
                        <label htmlFor="product-quantity" className="block text-sm font-medium text-neutral-300 mb-1">
                            Cantidad
                        </label>
                        <input
                            id="product-quantity"
                            type="number"
                            min={1}
                            max={999}
                            className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </div>

                    {/* Fecha de caducidad */}
                    <div>
                        <label htmlFor="product-expiry" className="block text-sm font-medium text-neutral-300 mb-1">
                            Fecha de caducidad
                        </label>
                        <input
                            id="product-expiry"
                            type="date"
                            min={today}
                            className="w-full px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4 pt-2">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 py-2.5 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                            {submitting ? "Guardando..." : "Añadir Producto"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/products")}
                            className="flex-1 bg-neutral-700 py-2.5 rounded-lg font-medium hover:bg-neutral-600 transition"
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