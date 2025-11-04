import { FileDown } from "lucide-react";

export default function RecentTable({ rows = [] }) {
    return (
        <div className="card">
        <div className="card-pad">
            <div className="flex items-center justify-between">
            <div className="text-base font-semibold">Últimos Sellos</div>
            <a href="#" className="text-sm text-orange-600 hover:underline">Ver todas</a>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-neutral-800/60 text-gray-600 dark:text-neutral-300">
                <tr>
                <th className="text-left font-semibold px-5 py-3">Nombre archivo</th>
                <th className="text-left font-semibold px-5 py-3">Fecha</th>
                <th className="text-left font-semibold px-5 py-3">Hash</th>
                <th className="text-left font-semibold px-5 py-3">Descargar PDF</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((r, i) => {
                const hashAbreviado = r.hash
                    ? `${r.hash.slice(0, 10)}...${r.hash.slice(-6)}`
                    : "";

                return (
                    <tr key={i} className="border-t border-black/5 dark:border-white/5">
                    <td className="px-5 py-3">{r.nombre}</td>
                    <td className="px-5 py-3">{r.fecha}</td>
                    <td className="px-5 py-3 text-xs text-slate-700 dark:text-slate-300">
                    <span className="cursor-help" title={r.hash}>
                        {r.hash.slice(0, 10)}...{r.hash.slice(-6)}
                    </span>
                    </td>

                    <td className="px-5 py-3">
                        <button
                        onClick={() => alert(`Descargando PDF de ${r.nombre}`)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium"
                        >
                        <FileDown className="w-4 h-4" />
                        
                        </button>
                    </td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
        </div>
    );
}
