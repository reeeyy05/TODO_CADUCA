import type { AccesosTotales } from "../../interfaces/AccesosTotales";

export interface UltimosAccesosRepository {
    getAccesosUltimos30Dias(): Promise<{ data: AccesosTotales[] | null; error: { message: string } | null }>;
}