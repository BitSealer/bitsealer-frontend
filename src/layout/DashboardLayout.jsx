// src/layouts/DashboardLayout.jsx
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function DashboardLayout({ children }) {
    // 🔑 Por defecto -> oscuro
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem('bm_theme')
        return saved ? saved === 'dark' : true   // si no existe nada => true (oscuro)
    })

    useEffect(() => {
        const root = document.documentElement
        if (dark) {
        root.classList.add('dark')
        localStorage.setItem('bm_theme', 'dark')
        } else {
        root.classList.remove('dark')
        localStorage.setItem('bm_theme', 'light')
        }
    }, [dark])

    return (
        <div className="h-screen w-full grid grid-cols-[260px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
            <Topbar dark={dark} onToggleTheme={() => setDark(v => !v)} />
            <main className="p-6 overflow-auto">{children}</main>
        </div>
        </div>
    )
}
