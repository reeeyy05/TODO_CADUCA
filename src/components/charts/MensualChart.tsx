import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

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
                <p className="text-green-400 font-bold text-lg">{payload[0].value} acceso{payload[0].value !== 1 ? 's' : ''}</p>
            </div>
        );
    }
    return null;
};

export function MensualChart({ title, data }: MensualChartProps) {
    const maxValue = Math.max(...data.map(d => d.value), 1);

    return (
        <div className="p-6 bg-neutral-800 border border-neutral-700 rounded-xl shadow-md w-full">
            <h3 className="text-xl font-bold mb-6 text-white">{title}</h3>

            <div style={{ width: '100%', height: '350px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#374151"
                            strokeOpacity={0.4}
                        />

                        <XAxis
                            dataKey="name"
                            stroke="#6b7280"
                            tickLine={false}
                            axisLine={false}
                            fontSize={11}
                            interval={data.length > 15 ? 2 : 0}
                            angle={data.length > 10 ? -45 : 0}
                            textAnchor={data.length > 10 ? 'end' : 'middle'}
                            height={data.length > 10 ? 50 : 30}
                        />

                        <YAxis
                            stroke="#6b7280"
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                            allowDecimals={false}
                            domain={[0, Math.max(maxValue + 1, 5)]}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                        />

                        <Bar
                            dataKey="value"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={entry.value > 0 ? '#22c55e' : '#1f2937'}
                                    fillOpacity={entry.value > 0 ? 0.85 : 0.3}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}