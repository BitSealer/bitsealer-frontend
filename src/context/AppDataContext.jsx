import { createContext, useContext, useEffect, useState } from 'react';
import { getDashboard } from '../api/files';

const AppDataCtx = createContext(null);

export function AppDataProvider({ children }) {
  const [kpis, setKpis] = useState([]);
  const [recent, setRecent] = useState([]);
  const [charts, setCharts] = useState({ line: null, bar: null, donut: null });

  useEffect(() => {
    // Obtener datos del dashboard de la API
    getDashboard().then(data => {
      setKpis(data.kpis || []);
      setRecent(data.recent || []);
      setCharts(data.charts || { line: null, bar: null, donut: null });
    }).catch(err => {
      console.error("Error fetching dashboard data", err);
    });
  }, []);

  const value = { kpis, recent, charts };
  return <AppDataCtx.Provider value={value}>{children}</AppDataCtx.Provider>;
}

export function useAppData() {
  return useContext(AppDataCtx);
}
