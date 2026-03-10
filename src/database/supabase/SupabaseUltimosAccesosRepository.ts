import { supabase } from './Client';
import type { UltimosAccesosRepository } from '../repositories/UltimosAccesosRepository';
import type { AccesosTotales } from '../../interfaces/AccesosTotales';

export class SupabaseUltimosAccesosRepository implements UltimosAccesosRepository {
    async getAccesosUltimos30Dias(): Promise<{ data: AccesosTotales[] | null; error: { message: string } | null }> {
        const { data, error } = await supabase
            .from('ultimos_accesos')
            .select('*')
            .order('day', { ascending: true })
            .limit(30);

        if (error) {
            return { data: null, error: { message: error.message } };
        }

        return { data: data as AccesosTotales[], error: null };
    }
}