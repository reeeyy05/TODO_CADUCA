export interface UsuarioProducto {
  id_usuario_producto: number;
  id_perfil: number;
  id_producto: number;
  cantidad: number;
  fecha_caducidad: string;
  estado: 'pendiente' | 'consumido';
  fecha_creacion: string;
  user_id: string;
  producto?: {
    nombre: string;
    id_categoria: number;
    categoria?: {
      nombre: string;
    };
  };
}