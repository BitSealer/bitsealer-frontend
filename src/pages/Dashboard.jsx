import Sidebar from '../components/Sidebar.jsx';
import Topbar from '../components/Topbar.jsx';
import StatCard from '../components/cards/StatCard.jsx';
import ProgressCard from '../components/cards/ProgressCard.jsx';
import AreaSparkline from '../components/charts/AreaSparkline.jsx';
import BarMini from '../components/charts/BarMini.jsx';
import LineChart from '../components/charts/LineChart.jsx';
import RecentTable from '../components/RecentTable.jsx';
import ActivityTimeline from '../components/ActivityTimeline.jsx';

import { kpis, progress, bars, actividad } from '../mocks/data.js';
import { useMemo, useState, useEffect } from 'react';
import { getHistory } from '../api/files';

export default function Dashboard() {
    const [period, setPeriod] = useState('30d');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getHistory()
            .then(data => {
                setHistory(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching history:", err);
                setLoading(false);
            });
    }, []);

    // 1. Calcular KPIs Reales
    const totalFiles = history.length;
    // Precio Bitcoin Mock
    const btcPrice = "64,230 $";

    // 2. Procesar datos para la gráfica (Trend)
    const { trendData, trendLabels } = useMemo(() => {
        if (!history.length) return { trendData: Array(10).fill(0), trendLabels: [] };

        const daysMap = {};
        const now = new Date();
        let daysCount = 30;
        if (period === '7d') daysCount = 7;
        if (period === '90d') daysCount = 90;

        // Inicializar mapa con 0s
        for (let i = 0; i < daysCount; i++) {
            const d = new Date();
            d.setDate(now.getDate() - i);
            const key = d.toISOString().split('T')[0];
            daysMap[key] = 0;
        }

        // Contar archivos por día
        history.forEach(file => {
            const dateStr = file.createdAt ? file.createdAt.split('T')[0] : '';
            if (daysMap[dateStr] !== undefined) {
                daysMap[dateStr]++;
            }
        });

        const sortedKeys = Object.keys(daysMap).sort();
        return {
            trendData: sortedKeys.map(k => daysMap[k]),
            trendLabels: sortedKeys
        };
    }, [history, period]);

    // 3. Procesar datos para la tabla (RecentTable)
    const recentFiles = useMemo(() => {
        return [...history]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map(file => ({
                nombre: file.originalFilename,
                fecha: file.createdAt ? file.createdAt.split('T')[0] : 'N/A',
                hash: file.sha256
            }));
    }, [history]);

    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-neutral-950">
            {/* Sidebar “pro” */}


            {/* Main */}
            <div className="flex-1 flex flex-col">
                {/* Topbar si lo necesitas */}
                <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white dark:bg-neutral-900/70 border-b border-gray-200 dark:border-neutral-800">
                    <div className="px-4 md:px-6 py-3">

                    </div>
                </div>

                <main className="p-4 md:p-6 space-y-6">
                    {/* Nuevos KPIs Superiores */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <StatCard
                            title="Total Archivos Sellados"
                            value={totalFiles}
                            icon="🗂️"
                        />
                        <StatCard
                            title="Precio Red Bitcoin"
                            value={btcPrice}
                            delta={2.4}
                            icon="₿"
                        />
                    </section>

                    {/* Fila superior: Chart + Progress + mini bars */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2 card card-pad bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-base font-semibold text-gray-900 dark:text-white">Archivos sellados ({period})</div>
                                <div className="flex items-center gap-2">
                                    {['7d', '30d', '90d'].map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setPeriod(p)}
                                            className={`px-3 py-1.5 rounded-lg text-sm transition ${period === p
                                                    ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                                                    : 'bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-neutral-200'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-2">
                                <LineChart data={trendData} labels={trendLabels} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            {progress.map((p) => (
                                <div
                                    key={p.title}
                                    className="card card-pad bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-sm"
                                >
                                    <ProgressCard {...p} />
                                </div>
                            ))}
                            <div className="card card-pad bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-sm">
                                <div className="card-title text-gray-900 dark:text-white">Ocupación semanal</div>
                                <div className="mt-2">
                                    <BarMini values={bars} />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Fila media: tabla + timeline */}
                    <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <div className="xl:col-span-3 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-sm">
                            <RecentTable rows={recentFiles} />
                        </div>
                    </section>


                </main>
            </div>
        </div>
    );
}
