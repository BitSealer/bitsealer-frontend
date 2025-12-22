import { useEffect, useState } from 'react';
import { getHistory } from '../api/files';
import RecentTable from '../components/RecentTable';

export default function History() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getHistory()
      .then(data => {
        const rows = data.map(file => ({
          nombre: file.originalFilename,
          fecha: file.createdAt ? file.createdAt.split('T')[0] : '',
          hash: file.sha256,
          estado: file.stampStatus || 'PENDING', // fallback
        }));
        setFiles(rows);
      })
      .catch(err => {
        console.error(err);
        setError('Error al cargar el historial');
      });
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="p-4">Historial de Archivos</h2>
      </div>
      <div className="card-body">
        {error && <div className="error">{error}</div>}
        <RecentTable rows={files} />
      </div>
    </div>
  );
}
