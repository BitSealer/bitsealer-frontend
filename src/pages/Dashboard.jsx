import Sidebar from '../components/Sidebar.jsx';
import Topbar from '../components/Topbar.jsx';
import StatCard from '../components/cards/StatCard.jsx';
import ProgressCard from '../components/cards/ProgressCard.jsx';
import AreaSparkline from '../components/charts/AreaSparkline.jsx';
import BarMini from '../components/charts/BarMini.jsx';
import LineChart from '../components/charts/LineChart.jsx';
import RecentTable from '../components/RecentTable.jsx';
import ActivityTimeline from '../components/ActivityTimeline.jsx';

import { kpis, progress, trend, bars, reservas, actividad } from '../mocks/data.js';
import { useMemo, useState } from 'react';

export default function Dashboard() {
const [period, setPeriod] = useState('30d');
const trendData = useMemo(() => trend, [period]); // en real, cambiarías aquí

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
        {/* Fila superior: Progress + mini bars + filtro */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 card card-pad bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="text-base font-semibold text-gray-900 dark:text-white">Archivos sellados</div>
                <div className="flex items-center gap-2">
                <button
                    onClick={() => setPeriod('7d')}
                    className={`px-3 py-1.5 rounded-lg text-sm transition ${
                    period === '7d'
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                        : 'bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-neutral-200'
                    }`}
                >
                    7d
                </button>
                <button
                    onClick={() => setPeriod('30d')}
                    className={`px-3 py-1.5 rounded-lg text-sm transition ${
                    period === '30d'
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                        : 'bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-neutral-200'
                    }`}
                >
                    30d
                </button>
                <button
                    onClick={() => setPeriod('90d')}
                    className={`px-3 py-1.5 rounded-lg text-sm transition ${
                    period === '90d'
                        ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
                        : 'bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-neutral-200'
                    }`}
                >
                    90d
                </button>
                </div>
            </div>
            <div className="mt-2">
                <LineChart data={trendData} />
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
            <RecentTable rows={reservas} />
            </div>
        </section>

        
        </main>
    </div>
    </div>
);
}
