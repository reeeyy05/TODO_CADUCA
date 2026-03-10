import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface AccesoData {
    name: string;
    value: number;
}

interface MensualChartProps {
    title: string;
    data: AccesoData[];
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean, payload?: any[], label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-neutral-900 border border-neutral-700 p-3 rounded-lg shadow-xl">
                <p className="text-white font-medium mb-1 text-sm">{label}</p>
                <p className="text-green-500 font-bold text-lg">{payload[0].value} accesos</p>
            </div>
        );
    }
    return null;
};

export function MensualChart({ title, data }: MensualChartProps) {
    return (
        <div className="p-6 bg-neutral-800 border border-neutral-700 rounded-xl shadow-md w-full">
            <h3 className="text-2xl font-bold mb-8 text-white">{title}</h3>

            {/* AQUI ESTÁ EL TRUCO PARA EL ERROR: 
                Usamos style={{ height: '600px' }} en lugar de clases raras de Tailwind 
                para forzar a que sea ENORME y nunca de error. */}
            <div style={{ width: '100%', height: '600px' }}>
                <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.5} />

                        {/* AQUÍ ESTÁ LA MAGIA DE LOS 30 DÍAS EXACTOS */}
                        <XAxis
                            dataKey="name"
                            stroke="#9ca3af"
                            tickLine={false}
                            axisLine={false}
                            interval={0}         /* ¡ESTO OBLIGA A PINTAR LOS 30 DÍAS SIN SALTARSE NI UNO! */
                            angle={-45}          /* INCLINAMOS EL TEXTO PARA QUE NO CHOCA (Día 1, Día 2...) */
                            textAnchor="end"     /* ALINEA EL TEXTO INCLINADO */
                            height={60}          /* DEJAMOS HUECO ABAJO PARA EL TEXTO */
                            fontSize={12}
                        />

                        <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} dx={-10} fontSize={13} />

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#525252' }} />

                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#15803d"
                            strokeWidth={4}
                            fill="#15803d"
                            fillOpacity={0.2}
                            activeDot={{ r: 7 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}