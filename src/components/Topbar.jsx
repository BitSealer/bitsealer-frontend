// src/components/Topbar.jsx
import { useAuth } from '../context/AuthContext'

export default function Topbar({ dark, onToggleTheme }) {
    const { user, logout } = useAuth()

    return (
        <header className="h-14 border-b border-white/10 px-4 flex items-center justify-between">
            <div className="font-semibold">BitSealer</div>
            <div className="flex items-center gap-3">
                {/* Cambiar tema */}
                <button
                    onClick={onToggleTheme}
                    className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200"
                    title={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                >
                    {dark ? '🌙 Oscuro' : '☀️ Claro'}
                </button>

                {/* Usuario */}
                {user && <span className="text-sm text-slate-500 dark:text-slate-300">{user.email}</span>}

                {/* Cerrar sesión */}
                <button
                    onClick={logout}
                    className="px-3 py-1.5 rounded-md text-sm bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15"
                >
                    Salir
                </button>
            </div>
        </header>
    )
}
