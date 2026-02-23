/** Calcula los días restantes hasta una fecha de caducidad */
export function daysUntilExpiry(fecha: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(fecha);
  expiry.setHours(0, 0, 0, 0);
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export type ExpiryLevel = "expired" | "urgent" | "warning" | "ok";

/** Devuelve el nivel de urgencia según los días restantes */
export function getExpiryLevel(days: number): ExpiryLevel {
  if (days <= 0) return "expired";
  if (days <= 3) return "urgent";
  if (days <= 7) return "warning";
  return "ok";
}

/** Devuelve una etiqueta legible según los días restantes */
export function getExpiryLabel(days: number): string {
  if (days < 0) return "Caducado";
  if (days === 0) return "Caduca hoy";
  if (days <= 7) return `Caduca en ${days}d`;
  return `${days} días`;
}
