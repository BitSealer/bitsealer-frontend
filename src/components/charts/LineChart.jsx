



import { useState } from 'react';

export default function LineChart({ data = [20, 25, 22, 30, 28, 34, 40, 38, 45, 50], labels = [] }) {
    const w = 600, h = 220, pad = 40; // Increased padding for axes
    const max = Math.max(...data) || 1;
    const stepX = (w - pad * 2) / (data.length - 1 || 1);
    const y = v => h - pad - (v / max) * (h - pad * 2);
    const x = i => pad + i * stepX;
    const path = data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');

    const [hoveredPoint, setHoveredPoint] = useState(null);

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full text-xs font-sans text-gray-500 dark:text-gray-400">
            <rect x="0" y="0" width={w} height={h} rx="12" className="fill-white dark:fill-neutral-800" />

            {/* Grid lines */}
            <g opacity="0.5">
                <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} className="stroke-gray-200 dark:stroke-neutral-700" />
                <line x1={pad} y1={pad} x2={pad} y2={h - pad} className="stroke-gray-200 dark:stroke-neutral-700" />
            </g>

            {/* Y Axis Labels */}
            <g className="text-[10px]" textAnchor="end">
                <text x={pad - 5} y={h - pad}>{0}</text>
                <text x={pad - 5} y={y(max / 2)}>{Math.round(max / 2)}</text>
                <text x={pad - 5} y={y(max)}>{max}</text>
            </g>

            {/* X Axis Labels (Start, Middle, End) */}
            {labels.length > 0 && (
                <g className="text-[10px]" textAnchor="middle">
                    <text x={x(0)} y={h - pad + 15}>{labels[0]}</text>
                    {labels.length > 2 && <text x={x(Math.floor(labels.length / 2))} y={h - pad + 15}>{labels[Math.floor(labels.length / 2)]}</text>}
                    {labels.length > 1 && <text x={x(labels.length - 1)} y={h - pad + 15}>{labels[labels.length - 1]}</text>}
                </g>
            )}

            <path d={path} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" />
            <defs>
                <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#f7931a" />
                    <stop offset="100%" stopColor="#ffcc00" />
                </linearGradient>
            </defs>

            {/* Data Points & Tooltip Triggers */}
            {data.map((v, i) => (
                <g key={i}>
                    <circle
                        cx={x(i)}
                        cy={y(v)}
                        r="4"
                        className="fill-white stroke-orange-500 stroke-2 cursor-pointer hover:r-6 transition-all"
                        onMouseEnter={() => setHoveredPoint({ x: x(i), y: y(v), value: v, label: labels[i] })}
                        onMouseLeave={() => setHoveredPoint(null)}
                    />
                    {/* Invisible larger target for easier hovering */}
                    <circle
                        cx={x(i)}
                        cy={y(v)}
                        r="10"
                        className="fill-transparent cursor-pointer"
                        onMouseEnter={() => setHoveredPoint({ x: x(i), y: y(v), value: v, label: labels[i] })}
                        onMouseLeave={() => setHoveredPoint(null)}
                    />
                </g>
            ))}

            {/* Tooltip */}
            {hoveredPoint && (
                <g pointerEvents="none">
                    <rect
                        x={hoveredPoint.x - 60}
                        y={hoveredPoint.y - 50}
                        width="120"
                        height="40"
                        rx="6"
                        className="fill-gray-900 dark:fill-white shadow-lg"
                        opacity="0.9"
                    />
                    <text
                        x={hoveredPoint.x}
                        y={hoveredPoint.y - 32}
                        textAnchor="middle"
                        className="fill-white dark:fill-gray-900 text-[10px] font-bold"
                    >
                        {hoveredPoint.label}
                    </text>
                    <text
                        x={hoveredPoint.x}
                        y={hoveredPoint.y - 18}
                        textAnchor="middle"
                        className="fill-white dark:fill-gray-900 text-[10px]"
                    >
                        Sellados: {hoveredPoint.value}
                    </text>
                    {/* Triangle pointer */}
                    <path d={`M${hoveredPoint.x - 5},${hoveredPoint.y - 10} L${hoveredPoint.x + 5},${hoveredPoint.y - 10} L${hoveredPoint.x},${hoveredPoint.y - 5} Z`} className="fill-gray-900 dark:fill-white" opacity="0.9" />
                </g>
            )}
        </svg>
    )
}
