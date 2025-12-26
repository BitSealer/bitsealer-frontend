import { useEffect, useMemo, useRef, useState } from "react";
import { FileDown, FileText, ShieldCheck } from "lucide-react";
import { downloadCertificate, downloadOts } from "../api/files";

function downloadBlob(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}

function badge(estado) {
    const st = (estado || "").toUpperCase();
    if (st === "SEALED") return "bg-emerald-100 text-emerald-800";
    if (st === "ERROR") return "bg-rose-100 text-rose-800";
    return "bg-amber-100 text-amber-900";
}

function label(estado) {
    const st = (estado || "").toUpperCase();
    if (st === "SEALED") return "Sellado";
    if (st === "ERROR") return "Error";
    return "Pendiente";
}

export default function RecentTable({ rows = [] }) {
    const [openIndex, setOpenIndex] = useState(null);

    // Ref al contenedor del menú abierto (lo ponemos en la fila que esté abierta)
    const openMenuRef = useRef(null);

    // Cerrar al hacer click fuera + cerrar con Escape
    useEffect(() => {
        if (openIndex === null) return;

        const handleMouseDown = (e) => {
            // Si el click NO está dentro del contenedor del menú/botón => cerramos
            if (openMenuRef.current && !openMenuRef.current.contains(e.target)) {
                setOpenIndex(null);
            }
        };

        const handleKeyDown = (e) => {
            if (e.key === "Escape") setOpenIndex(null);
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [openIndex]);

    const safeRows = useMemo(() => rows.map(r => ({
        ...r,
        id: r.id,
        stampId: r.stampId
    })), [rows]);

    const onDownloadOts = async (r) => {
        try {
            const res = await downloadOts(r.id);
            const cd = res.headers?.['content-disposition'] || res.headers?.get?.('content-disposition');
            const filenameFromHeader = typeof cd === 'string'
                ? (cd.match(/filename="?([^";]+)"?/i)?.[1] || null)
                : null;

            const name = filenameFromHeader || `${(r.nombre || 'proof')}.ots`;
            downloadBlob(res.data, name);
        } catch (e) {
            console.error(e);
            alert("No se pudo descargar el .ots (¿todavía no está generado?)");
        } finally {
            setOpenIndex(null);
        }
    };

    const onDownloadPdf = async (r) => {
        try {
            const res = await downloadCertificate(r.id);
            const cd = res.headers?.['content-disposition'] || res.headers?.get?.('content-disposition');
            const filenameFromHeader = typeof cd === 'string'
                ? (cd.match(/filename="?([^";]+)"?/i)?.[1] || null)
                : null;

            const name = filenameFromHeader || `${(r.nombre || 'certificate')}-certificate.pdf`;
            downloadBlob(res.data, name);
        } catch (e) {
            console.error(e);
            alert("No se pudo descargar el certificado PDF");
        } finally {
            setOpenIndex(null);
        }
    };

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
                        {safeRows.map((r, i) => (
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

                                {/* IMPORTANTE: el ref solo se aplica a la fila cuyo menú está abierto */}
                                <td className="px-5 py-3 relative">
                                    <div
                                        className="inline-block"
                                        ref={openIndex === i ? openMenuRef : null}
                                    >
                                        <button
                                            disabled={!r.id || !r.stampId}
                                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:hover:bg-orange-500 text-white text-xs font-medium"
                                            title={!r.stampId ? "Aún no hay sello asociado" : "Descargar"}
                                        >
                                            <FileDown className="w-4 h-4" />
                                            Descargar
                                        </button>

                                        {openIndex === i && (
                                            <div className="absolute z-20 mt-2 w-56 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg">
                                                <button
                                                    onClick={() => onDownloadOts(r)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-neutral-800"
                                                >
                                                    <ShieldCheck className="w-4 h-4" />
                                                    Descargar .ots
                                                </button>
                                                <button
                                                    onClick={() => onDownloadPdf(r)}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-neutral-800"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    Descargar certificado (PDF)
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
}
