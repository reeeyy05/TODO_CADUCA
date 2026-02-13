export interface Producto {
    id: string;
    nombre: string;
    cantidad: string;
    fecha_caducidad: string;
    estado: 'pendiente' | 'consumido';
    id_categoria: string;
    user_id: string;
    created_at: string;
}