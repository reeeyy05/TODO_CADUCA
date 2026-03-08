import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Search, Plus, AlertTriangle, Clock, Package } from "lucide-react";
import { createProductRepository, createCategoryRepository } from "../database/repositories";
import type { UsuarioProducto } from "../interfaces/UsuarioProducto";
import type { Categoria } from "../interfaces/Categoria";
import ProductCard from "../components/cards/ProductCard";

/** Calcula los días restantes hasta la fecha de caducidad */
function daysUntilExpiry(fecha: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(fecha);
    expiry.setHours(0, 0, 0, 0);
    return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

// obtener la imagen por defecto según el ID de la categoría
function getCategoryImage(categoryId?: number): string {
    switch (categoryId) {
        case 1: // Frutas
            return "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80";
        case 2: // Verduras
            return "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=300&q=80";
        case 3: // Carnes
            return "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=300&q=80";
        case 4: // Lácteos
            return "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=300&q=80";
        case 5: // Bebidas
            return "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=300&q=80";
        case 6: // Congelados
            return "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=300&q=80";
        case 7: // Pescado
            return "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=300&q=80";
        case 8: // Bollería
            return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80";
        default: // Otros
            return "https://images.unsplash.com/photo-1584308666744-24d5e478ac5c?auto=format&fit=crop&w=300&q=80";
    }
}

function ProductsPage() {
    const { t } = useTranslation();
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
                        <h1 className="text-3xl font-bold mb-1">{t("ProductsPage.title", "Mis Productos")}</h1>
                        <p className="text-neutral-400">{t("ProductsPage.subtitle", "Gestiona tus productos y fechas de caducidad.")}</p>
                    </div>
                    <Link to="/addProducts" className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-green-600 px-5 py-2.5 rounded-lg text-white font-medium hover:bg-green-700 transition">
                        <Plus size={18} /> {t("ProductsPage.add", "Añadir Producto")}
                    </Link>
                </div>

                {/* Filtros */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input type="text" placeholder={t("ProductsPage.search_placeholder", "Buscar por nombre...")} value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>
                    <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} aria-label="Filtrar por categoría"
                        className="px-4 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                        <option value="">{t("ProductsPage.all_categories", "Todas las categorías")}</option>
                        {categories.map((c) => <option key={c.id_categoria} value={c.nombre}>{c.nombre}</option>)}
                    </select>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                        <AlertTriangle size={18} /> {error}
                        <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-200">{t("ProductsPage.close_error", "✕")}</button>
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
                            {products.length === 0
                                ? t("ProductsPage.no_products", "No tienes productos todavía. ¡Añade uno para empezar!")
                                : t("ProductsPage.no_results", "No se encontraron productos con ese filtro.")}
                        </p>
                        {products.length === 0 && (
                            <Link to="/addProducts" className="inline-flex items-center gap-2 mt-4 bg-green-600 px-5 py-2.5 rounded-lg text-white font-medium hover:bg-green-700 transition">
                                <Plus size={18} /> {t("ProductsPage.add_first", "Añadir mi primer producto")}
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="products-grid">
                        {filtered.map((item) => (
                            <ProductCard
                                key={item.id_usuario_producto}
                                item={item}
                                deletingId={deletingId}
                                onMarkConsumed={handleMarkConsumed}
                                onDelete={handleDelete}
                                // imagen según la categoría
                                imageUrl={getCategoryImage(item.producto?.id_categoria)}
                            />
                        ))}
                    </div>
                )}

                {/* Tarjetas resumen */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
                    <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
                        <div className="flex items-center gap-3 mb-2"><AlertTriangle size={20} className="text-red-400" /><h3 className="font-semibold">{t("ProductsPage.expired_title", "Caducados")}</h3></div>
                        <p className="text-3xl font-bold text-red-400">{stats.expired}</p>
                        <p className="text-sm text-neutral-400 mt-1">{t("ProductsPage.expired_desc", "Productos vencidos")}</p>
                    </div>
                    <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
                        <div className="flex items-center gap-3 mb-2"><Clock size={20} className="text-yellow-300" /><h3 className="font-semibold">{t("ProductsPage.expiring_title", "Por caducar")}</h3></div>
                        <p className="text-3xl font-bold text-yellow-300">{stats.expiringSoon}</p>
                        <p className="text-sm text-neutral-400 mt-1">{t("ProductsPage.expiring_desc", "En los próximos 3 días")}</p>
                    </div>
                    <div className="bg-neutral-800 p-5 rounded-xl border border-neutral-700">
                        <div className="flex items-center gap-3 mb-2"><Package size={20} className="text-green-400" /><h3 className="font-semibold">{t("ProductsPage.total_title", "Total")}</h3></div>
                        <p className="text-3xl font-bold text-green-400">{stats.total}</p>
                        <p className="text-sm text-neutral-400 mt-1">{t("ProductsPage.total_desc", "Productos en inventario")}</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProductsPage;