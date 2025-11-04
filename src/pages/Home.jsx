

import useReveal from '../hooks/useReveal'
import PublicNavbar from '../components/public/PublicNavbar'
import PublicFooter from '../components/public/PublicFooter'

export default function Home() {
    const r1 = useReveal(0)
    const r2 = useReveal(100)
    const r3 = useReveal(200)
    const r4 = useReveal(300)

    return (
        <div className="min-h-screen flex flex-col">
        <PublicNavbar />

        {/* HERO */}
        <section className="relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-amber-50/40 to-white dark:from-slate-900 dark:via-amber-500/5 dark:to-slate-950" />
            <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24 grid md:grid-cols-2 gap-10 items-center">
            <div ref={r1}>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Sella tus <span className="bg-gradient-to-r from-[#f7931a] to-[#ffcc00] bg-clip-text text-transparent">archivos</span> en el servidor mas seguro del mundo.
                </h1>
                <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg">
                Prueba de existencia inmutable. Subes un archivo, calculamos su hash y lo anclamos a Bitcoin. Verificable de por vida.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                        <a href="/dashboard" className="btn btn-primary bg-[#f7931a] hover:bg-[#e67e00] px-4 py-1.5 rounded-md">
                            Empieza gratis
                        </a>
                        <a href="#features" className="btn-ghost">
                            Ver características
                        </a>
                    </div>
                </div>
                {/* Tira de logos de confianza */}
                <div className="mt-10 flex items-center gap-6 opacity-80">
                    <img src="/assets/logos/partner1.svg" alt="Partner 1" className="h-8" />
                    <img src="/assets/logos/partner2.svg" alt="Partner 2" className="h-8" />
                    <img src="/assets/logos/partner3.svg" alt="Partner 3" className="h-8" />
                    <img src="/assets/logos/partner4.svg" alt="Partner 4" className="h-8" />
                </div>
            </div>

            {/* Hero image */}
            <div className="relative" ref={r2}>
                {/* >> AQUÍ pon una imagen potente relacionada con blockchain/seguridad */}
                <img src="/assets/hero.jpg" alt="Sellado en Bitcoin" className="w-full rounded-2xl shadow-2xl" />
                {/* Overlay flotante con captura del dashboard */}
                <img
                src="/assets/screenshot-dashboard.png"
                alt="Dashboard BitSealer"
                className="hidden md:block absolute -bottom-6 -left-6 w-2/3 rounded-xl shadow-2xl border border-white/30 dark:border-white/10"
                />
            </div>
            </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="max-w-6xl mx-auto px-4 py-14">
            <div className="text-center mb-10" ref={r1}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">¿Por qué BitSealer?</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Velocidad, transparencia y rigor criptográfico.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-6 hover:shadow-lg hover:shadow-orange-200/40 hover:scale-[1.02] transition" ref={r2}>
                <img src="/assets/feature-hash.jpg" alt="Hash SHA-256" className="w-full h-40 object-cover rounded-lg" />
                <h3 className="mt-4 text-lg font-bold">Huella criptográfica</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Calculamos el <strong>SHA-256</strong> de tu archivo. El contenido nunca sale de tu control: solo guardamos el hash.
                </p>
            </div>

            <div className="card p-6 hover:shadow-lg hover:shadow-orange-200/40 hover:scale-[1.02] transition" ref={r3}>
                <img src="/assets/feature-blockchain.jpg" alt="Blockchain Bitcoin" className="w-full h-40 object-cover rounded-lg" />
                <h3 className="mt-4 text-lg font-bold">Sello en Bitcoin</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Anclamos tu hash en una transacción <strong>Bitcoin</strong>. Prueba verificable por cualquiera.
                </p>
            </div>

            <div className="card p-6 hover:shadow-lg hover:shadow-orange-200/40 hover:scale-[1.02] transition" ref={r4}>
                <img src="/assets/feature-pdf.jpg" alt="Certificado PDF" className="w-full h-40 object-cover rounded-lg" />
                <h3 className="mt-4 text-lg font-bold">Certificado PDF</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Descarga un <strong>PDF</strong> con hash, fecha y TxID. Ideal para auditorías y compliance.
                </p>
            </div>
            </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section id="como-funciona" className="max-w-6xl mx-auto px-4 py-14">
            <div className="grid md:grid-cols-3 gap-6">
            {[
                { n: "1", t: "Sube tu archivo", d: "Arrastra y suelta. Calculamos el hash localmente." },
                { n: "2", t: "Sellamos en Bitcoin", d: "Registramos tu hash en una transacción." },
                { n: "3", t: "Descarga la prueba", d: "Obtén el PDF y el TxID para verificar." },
            ].map((s, i) => (
                <div key={i} className="card p-6 hover:shadow-lg hover:shadow-orange-200/40 hover:scale-[1.02] transition" ref={i===0?r1:i===1?r2:r3}>
                <div className="size-9 rounded-full bg-gradient-to-r from-[#f7931a] to-[#ffcc00] text-white grid place-items-center font-bold">{s.n}</div>
                <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{s.d}</p>
                </div>
            ))}
            </div>
        </section>

        {/* BANDA DE STATS */}
        <section className="bg-gradient-to-r from-[#fff3e0] to-[#fffbeb] dark:from-amber-500/10 dark:to-amber-500/5">
            <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <StatItem n="10.2K" t="Archivos sellados" />
            <StatItem n="< 5s" t="Cálculo de hash" />
            <StatItem n="24/7" t="Disponibilidad" />
            <StatItem n="100%" t="Verificable" />
            </div>
        </section>

      {/* DEMO INTERACTIVA (verificación mock) */}
        <section className="max-w-6xl mx-auto px-4 py-14" id="verificar">
            <div className="card p-6">
            <h3 className="text-xl font-bold">Prueba rápida de verificación</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">Pega un hash SHA-256 y te decimos si “estaría” en blockchain (mock).</p>
            <VerifierMock />
            </div>
        </section>

      {/* PRECIOS/CTA */}
        <section id="precio" className="max-w-6xl mx-auto px-4 py-14">
            <div className="grid md:grid-cols-3 gap-6">
            <Plan title="Free" price="0€" items={['3 archivos/mes', 'PDF certificado', 'Soporte por email']} />
            <Plan title="Pro" price="19€/mes" items={['200 archivos/mes', 'Prioridad de sellado', 'Branding propio']} ribbon="Recomendado" />
            <Plan title="Enterprise" price="A medida" items={['On-premise', 'SLA y auditoría', 'Soporte dedicado']} />
            </div>
            <div className="text-center mt-8">
            <a href="/dashboard" className="btn btn-primary bg-[#f7931a] hover:bg-[#e67e00]">Comenzar ahora</a>
            </div>
        </section>

        <PublicFooter />
        </div>
    )
}

function StatItem({ n, t }) {
    return (
        <div className="reveal">
        <div className="text-3xl font-extrabold">{n}</div>
        <div className="text-sm text-slate-600 dark:text-slate-300">{t}</div>
        </div>
    )
}

function VerifierMock() {
    const onCheck = (e) => {
        e.preventDefault()
        const hash = new FormData(e.currentTarget).get('hash')?.toString() || ''
        if (!hash || hash.length < 20) return alert('Introduce un hash (mock).')
        // Aquí en real llamarías a tu backend o a un explorer
        alert(`(Mock) Hash ${hash.slice(0,10)}... encontrado en bloque #857, TxID abc123...`)
    }
    return (
        <form onSubmit={onCheck} className="mt-4 flex flex-col sm:flex-row gap-3">
        <input name="hash" placeholder="Pega tu hash SHA-256"
            className="flex-1 h-11 px-3 rounded-lg bg-slate-100/80 dark:bg-white/10 border border-white/20 dark:border-white/10 outline-none text-sm" />
        <button className="btn btn-primary bg-[#f7931a] hover:bg-[#e67e00]">Verificar</button>
        </form>
    )
}

function Plan({ title, price, items, ribbon }) {
    return (
        <div className="relative card p-6 hover:shadow-lg hover:shadow-orange-200/40 hover:scale-[1.02] transition">
        {ribbon && (
            <div className="absolute -top-3 right-4 text-xs px-2 py-1 rounded-full bg-[#f7931a] text-white">{ribbon}</div>
        )}
        <h4 className="text-lg font-bold">{title}</h4>
        <div className="mt-1 text-3xl font-extrabold">{price}</div>
        <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {items.map((it, i) => <li key={i}>• {it}</li>)}
        </ul>
        </div>
    )
}
