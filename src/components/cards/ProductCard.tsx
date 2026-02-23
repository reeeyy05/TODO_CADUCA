import { Trash2, Calendar, ShoppingBag, CheckCircle2 } from "lucide-react";
import type { UsuarioProducto } from "../../interfaces/UsuarioProducto";
import { daysUntilExpiry, getExpiryLevel, getExpiryLabel } from "../../utils/dates";

interface ProductCardProps {
    item: UsuarioProducto;
    deletingId: number | null;
    onMarkConsumed: (id: number) => void;
    onDelete: (id: number) => void;
}

const ProductCard = ({ item, deletingId, onMarkConsumed, onDelete }: ProductCardProps) => {
    const days = daysUntilExpiry(item.fecha_caducidad);
    const isConsumed = item.estado === "consumido";
    const level = isConsumed ? "consumed" : getExpiryLevel(days);
    const label = isConsumed ? "✓ Consumido" : getExpiryLabel(days);

    const fecha = new Date(item.fecha_caducidad).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    // Barra de progreso (máximo 30 días)
    const progressMax = 30;
    const progressValue = Math.max(0, Math.min(days, progressMax));
    const progressPercent = (progressValue / progressMax) * 100;

    // Nivel para la barra (sin "consumed")
    const barLevel = getExpiryLevel(days);

    // Color del icono
    const iconColor =
        isConsumed ? "text-neutral-400"
        : days <= 0 ? "text-red-400"
        : days <= 3 ? "text-orange-400"
        : "text-green-400";

    return (
        <div className={`product-card ${isConsumed ? "product-card--consumed" : ""}`}>
            {/* Acento superior */}
            <div className={`product-card__accent product-card__accent--${level}`} />

            <div className="product-card__body">
                {/* Cabecera */}
                <div className="product-card__header">
                    <div className={`product-card__icon product-card__icon--${level}`}>
                        {isConsumed
                            ? <CheckCircle2 size={18} className="text-neutral-400" />
                            : <ShoppingBag size={18} className={iconColor} />
                        }
                    </div>

                    <div className="product-card__info">
                        <h3 className="product-card__name">
                            {item.producto?.nombre ?? "Producto"}
                        </h3>
                        <p className="product-card__category">
                            {item.producto?.categoria?.nombre ?? "Sin categoría"}
                        </p>
                    </div>

                    <span className={`product-card__badge product-card__badge--${level}`}>
                        {label}
                    </span>
                </div>

                {/* Fecha + cantidad */}
                <div className="product-card__meta">
                    <span className="product-card__date">
                        <Calendar size={14} />
                        {fecha}
                    </span>
                    <span className="product-card__quantity">×{item.cantidad} ud.</span>
                </div>

                {/* Barra de progreso */}
                {!isConsumed && (
                    <div className="product-card__progress">
                        <div className="product-card__progress-header">
                            <span>Tiempo restante</span>
                            <span className={`product-card__progress-value product-card__progress-value--${barLevel}`}>
                                {days <= 0 ? "Vencido" : `${days}d`}
                            </span>
                        </div>
                        <div className="product-card__progress-track">
                            <div
                                className={`product-card__progress-bar product-card__progress-bar--${barLevel}`}
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Separador */}
                <hr className="product-card__divider" />

                {/* Botones */}
                <div className="product-card__actions">
                    {!isConsumed && (
                        <button
                            onClick={() => onMarkConsumed(item.id_usuario_producto)}
                            className="product-card__btn product-card__btn--consume"
                        >
                            <CheckCircle2 size={15} /> Consumido
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(item.id_usuario_producto)}
                        disabled={deletingId === item.id_usuario_producto}
                        className="product-card__btn product-card__btn--delete"
                    >
                        <Trash2 size={14} />
                        {deletingId === item.id_usuario_producto ? "..." : "Eliminar"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;