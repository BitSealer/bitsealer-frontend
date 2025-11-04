export default function StatCard({ title, value, delta, icon }) {
    const positive = (delta ?? 0) >= 0
    return (
        <div className="card card-pad">
        <div className="flex items-center justify-between">
            <div>
            <div className="card-title">{title}</div>
            <div className="card-value">{value}</div>
            {typeof delta === 'number' && (
                <div className={`mt-1 text-xs font-medium ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {positive ? '▲' : '▼'} {Math.abs(delta)}%
                </div>
            )}
            </div>
            {icon && <div className="text-3xl">{icon}</div>}
        </div>
        </div>
    )
}
