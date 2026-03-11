import { supabase } from './Client';
import type { UltimosAccesosRepository } from '../repositories/UltimosAccesosRepository';
import type { AccesosTotales } from '../../interfaces/AccesosTotales';

export class SupabaseUltimosAccesosRepository implements UltimosAccesosRepository {
    async getAccesosUltimos30Dias(): Promise<{ data: AccesosTotales[] | null; error: { message: string } | null }> {
        const hace30Dias = new Date();
        hace30Dias.setDate(hace30Dias.getDate() - 30);
        const desde = hace30Dias.toISOString().split('T')[0];

        const { data, error } = await supabase
            .from('ultimos_accesos')
            .select('*')
            .gte('day', desde)
            .order('day', { ascending: true });

        if (error) {
            return { data: null, error: { message: error.message } };
        }

        return { data: data as AccesosTotales[], error: null };
    }
}