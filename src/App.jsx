
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import AppRouter from './router';

export default function App() {
  return (
    <div className="container-fluid vh-100 d-flex">
  <Sidebar />
  <div className="flex-grow-1 d-flex flex-column">
    <Topbar />
    <main className="flex-grow-1 overflow-auto p-3">
      <AppRouter />
    </main>
  </div>
</div>
  );
}
