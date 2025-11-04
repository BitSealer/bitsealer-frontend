



export default function LineChart({ data = [20,25,22,30,28,34,40,38,45,50], labels = [] }) {
    const w = 600, h = 220, pad = 24
    const max = Math.max(...data) || 1
    const stepX = (w - pad*2) / (data.length - 1)
    const y = v => h - pad - (v/max)*(h - pad*2)
    const x = i => pad + i*stepX
    const path = data.map((v,i)=>`${i?'L':'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        <rect x="0" y="0" width={w} height={h} rx="12" className="fill-white dark:fill-neutral-800" />
        <g opacity="0.5">
            <line x1={pad} y1={h-pad} x2={w-pad} y2={h-pad} className="stroke-gray-200 dark:stroke-neutral-700" />
            <line x1={pad} y1={pad} x2={pad} y2={h-pad} className="stroke-gray-200 dark:stroke-neutral-700" />
        </g>
        <path d={path} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5"/>
        <defs>
            <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#f7931a" />
            <stop offset="100%" stopColor="#ffcc00" />
            </linearGradient>
        </defs>
        {data.map((v,i)=>(
            <circle key={i} cx={x(i)} cy={y(v)} r="3" className="fill-white" />
        ))}
        </svg>
    )
}
