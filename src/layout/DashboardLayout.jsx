// src/layouts/DashboardLayout.jsx
import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function DashboardLayout({ children }) {
    // 🔑 Lógica para inicializar el estado del tema desde Local Storage o preferencia del sistema
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem('theme')
        if (saved !== null) {
            return saved === 'dark'
        }
        // Si no hay preferencia guardada, usar preferencia del sistema
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    })

    // 🔑 useEffect para aplicar la clase 'dark' al <html> y persistir en Local Storage
    useEffect(() => {
        const root = document.documentElement
        if (dark) {
            root.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [dark])

    // 🚨 CAMBIO CLAVE: Aplicar las clases de fondo y color de texto aquí para que reaccionen al estado 'dark'
    return (
        <div className="h-screen w-full grid grid-cols-[260px_1fr] bg-gray-50 text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
            <Sidebar />
            <div className="flex flex-col">
                {/* Pasar las props necesarias al Topbar */}
                <Topbar dark={dark} onToggleTheme={() => setDark(v => !v)} />
                <main className="p-6 overflow-auto">{children}</main>
            </div>
        </div>
    )
}