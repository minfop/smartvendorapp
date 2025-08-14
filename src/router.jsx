import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';

export default function AppRouter() {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
