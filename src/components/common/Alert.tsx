import type { AlertProps } from "../../interfaces/Alert";

export default function Alert({ message, type, onClose }: AlertProps) {
  const color = type === 'success' ? 'green' : 'red';
  return (
    <div style={{ border: `1px solid ${color}`, padding: '10px', margin: '10px 0' }}>
      <p>{message}</p>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}