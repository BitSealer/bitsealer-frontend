import { FileDown } from "lucide-react";

function badge(estado) {
    const st = (estado || "").toUpperCase();
    if (st === "SEALED") return "bg-emerald-100 text-emerald-800";
    if (st === "ERROR") return "bg-rose-100 text-rose-800";
    return "bg-amber-100 text-amber-900"; // PENDING
}

function label(estado) {
    const st = (estado || "").toUpperCase();
    if (st === "SEALED") return "Sellado";
    if (st === "ERROR") return "Error";
    return "Pendiente";
}

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
                <th className="text-left font-semibold px-5 py-3">Estado</th>
                <th className="text-left font-semibold px-5 py-3">Descargar</th>
                </tr>
            </thead>

            <tbody>
                {rows.map((r, i) => (
                <tr key={i} className="border-t border-black/5 dark:border-white/5">
                    <td className="px-5 py-3">{r.nombre}</td>
                    <td className="px-5 py-3">{r.fecha}</td>

                    <td className="px-5 py-3 text-xs text-slate-700 dark:text-slate-300">
                    <span className="cursor-help" title={r.hash}>
                        {r.hash?.slice(0, 10)}...{r.hash?.slice(-6)}
                    </span>
                    </td>

                    <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${badge(r.estado)}`}>
                        {label(r.estado)}
                    </span>
                    </td>

                    <td className="px-5 py-3">
                    <button
                        disabled={(r.estado || "").toUpperCase() !== "SEALED"}
                        onClick={() => alert("Pendiente: endpoint de descarga OTS/PDF aún no implementado")}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:hover:bg-orange-500 text-white text-xs font-medium"
                    >
                        <FileDown className="w-4 h-4" />
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>

            </table>
        </div>
        </div>
    );
}
