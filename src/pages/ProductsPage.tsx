import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Trash2, AlertTriangle, Clock, Package } from "lucide-react";
import { createProductRepository, createCategoryRepository } from "../database/repositories";
import type { UsuarioProducto } from "../interfaces/UsuarioProducto";
import type { Categoria } from "../interfaces/Categoria";

/** Calcula los días restantes hasta la fecha de caducidad */
function daysUntilExpiry(fecha: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(fecha);
    expiry.setHours(0, 0, 0, 0);
    return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

/** Devuelve etiqueta, color y fondo según los días restantes */
function getExpiryStatus(days: number) {
    if (days < 0) return { label: "Caducado", color: "text-red-400", bg: "bg-red-900/40" };
    if (days === 0) return { label: "Caduca hoy", color: "text-red-400", bg: "bg-red-900/40" };
    if (days <= 3) return { label: `Caduca en ${days}d`, color: "text-orange-400", bg: "bg-orange-900/30" };
    if (days <= 7) return { label: `Caduca en ${days}d`, color: "text-yellow-300", bg: "bg-yellow-900/20" };
    return { label: `${days} días`, color: "text-green-400", bg: "bg-green-900/20" };
}

function ProductsPage() {
    const [products, setProducts] = useState<UsuarioProducto[]>([]);
    const [categories, setCategories] = useState<Categoria[]>([]);
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const productRepo = useMemo(() => createProductRepository(), []);
    const categoryRepo = useMemo(() => createCategoryRepository(), []);

    // Carga inicial
    useEffect(() => {
        async function loadData() {
            setLoading(true);
            setError(null);

            const [prodResult, catResult] = await Promise.all([
                productRepo.getUserProducts(),
                categoryRepo.getCategories(),
            ]);

            if (prodResult.error) {
                setError("Error al cargar productos. Inténtalo de nuevo.");
            } else {
                setProducts(prodResult.data ?? []);
            }

            if (catResult.data) setCategories(catResult.data);
            setLoading(false);
        }
        loadData();
    }, [productRepo, categoryRepo]);

    // Filtrado y búsqueda
    const filtered = useMemo(() => {
        let result = products;

        if (search.trim()) {
            const term = search.toLowerCase();
            result = result.filter((p) => p.producto?.nombre.toLowerCase().includes(term));
        }
        if (filterCategory) {
            result = result.filter((p) => p.producto?.categoria?.nombre === filterCategory);
        }

        return result.sort(
            (a, b) => new Date(a.fecha_caducidad).getTime() - new Date(b.fecha_caducidad).getTime()
        );
    }, [products, search, filterCategory]);

    // Contadores resumen
    const stats = useMemo(() => {
        let expired = 0;
        let expiringSoon = 0;
        products.forEach((p) => {
            const d = daysUntilExpiry(p.fecha_caducidad);
            if (d <= 0) expired++;
            else if (d <= 3) expiringSoon++;
        });
        return { expired, expiringSoon, total: products.length };
    }, [products]);

    const handleDelete = async (id: number) => {
        if (deletingId) return;
        setDeletingId(id);
        const { error: err } = await productRepo.deleteUserProduct(id);
        if (err) setError("Error al eliminar el producto.");
        else setProducts((prev) => prev.filter((p) => p.id_usuario_producto !== id));
        setDeletingId(null);
    };

    const handleMarkConsumed = async (id: number) => {
        const { data: updated, error: err } = await productRepo.updateUserProduct(id, { estado: "consumido" });
        if (err) setError("Error al actualizar el producto.");
        else if (updated) setProducts((prev) => prev.map((p) => (p.id_usuario_producto === id ? updated : p)));
    };

    return (
        <div className="text-white flex flex-col">
            <main className="grow max-w-6xl mx-auto w-full px-6 py-10">
                {/* Título */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Mis Productos</h1>
                        <p className="text-neutral-400">Gestiona tus productos y fechas de caducidad.</p>
                    </div>
                    <Link to="/addProducts" className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-green-600 px-5 py-2.5 rounded-lg text-white font-medium hover:bg-green-700 transition">
                        <Plus size={18} /> Añadir Producto
                    </Link>
                </div>

                {/* Filtros */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input type="text" placeholder="Buscar por nombre..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} aria-label="Filtrar por categoría"
                        className="px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="">Todas las categorías</option>
                        {categories.map((c) => <option key={c.id_categoria} value={c.nombre}>{c.nombre}</option>)}
                    </select>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                        <AlertTriangle size={18} /> {error}
                        <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-200">✕</button>
                    </div>
                )}

                {/* Contenido */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20">
                        <Package size={48} className="mx-auto text-neutral-600 mb-4" />
                        <p className="text-neutral-400 text-lg">
                            {products.length === 0 ? "No tienes productos todavía. ¡Añade uno para empezar!" : "No se encontraron productos con ese filtro."}
                        </p>
                        {products.length === 0 && (
                            <Link to="/addProducts" className="inline-flex items-center gap-2 mt-4 bg-green-600 px-5 py-2.5 rounded-lg text-white font-medium hover:bg-green-700 transition">
                                <Plus size={18} /> Añadir mi primer producto
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filtered.map((item) => {
                            const days = daysUntilExpiry(item.fecha_caducidad);
                            const status = getExpiryStatus(days);
                            const isConsumed = item.estado === "consumido";
                            const fecha = new Date(item.fecha_caducidad).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });

                            return (
                                <div key={item.id_usuario_producto}
                                    className={`bg-neutral-800 border rounded-xl p-5 flex flex-col transition ${isConsumed ? "border-neutral-700 opacity-60" : days <= 0 ? "border-red-700/50" : days <= 3 ? "border-orange-700/50" : "border-neutral-700"}`}>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-lg truncate">{item.producto?.nombre ?? "Producto"}</h3>
                                            <p className="text-sm text-neutral-400">{item.producto?.categoria?.nombre ?? "Sin categoría"}</p>
                                        </div>
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${status.bg} ${status.color} whitespace-nowrap ml-2`}>
                                            {isConsumed ? "Consumido" : status.label}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-neutral-400 mb-3">
                                        <span className="flex items-center gap-1"><Clock size={14} />{fecha}</span>
                                        <span>×{item.cantidad}</span>
                                    </div>

                                    <div className="mt-auto flex gap-2">
                                        {!isConsumed && (
                                            <button onClick={() => handleMarkConsumed(item.id_usuario_producto)}
                                                className="flex-1 text-sm py-2 rounded-lg bg-green-900/30 text-green-400 hover:bg-green-900/50 transition font-medium">
                                                Consumido
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(item.id_usuario_producto)} disabled={deletingId === item.id_usuario_producto}
                                            className="flex items-center justify-center gap-1 text-sm py-2 px-3 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition disabled:opacity-50">
                                            <Trash2 size={14} /> {deletingId === item.id_usuario_producto ? "..." : "Eliminar"}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Tarjetas resumen */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
                    <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
                        <div className="flex items-center gap-3 mb-2"><AlertTriangle size={20} className="text-red-400" /><h3 className="font-semibold">Caducados</h3></div>
                        <p className="text-3xl font-bold text-red-400">{stats.expired}</p>
                        <p className="text-sm text-neutral-400 mt-1">Productos vencidos</p>
                    </div>
                    <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
                        <div className="flex items-center gap-3 mb-2"><Clock size={20} className="text-yellow-300" /><h3 className="font-semibold">Por caducar</h3></div>
                        <p className="text-3xl font-bold text-yellow-300">{stats.expiringSoon}</p>
                        <p className="text-sm text-neutral-400 mt-1">En los próximos 3 días</p>
                    </div>
                    <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
                        <div className="flex items-center gap-3 mb-2"><Package size={20} className="text-green-400" /><h3 className="font-semibold">Total</h3></div>
                        <p className="text-3xl font-bold text-green-400">{stats.total}</p>
                        <p className="text-sm text-neutral-400 mt-1">Productos en inventario</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProductsPage;
