
import Sidebar from './components/sidebar';
import Topbar from './components/topbar';
import AppRouter from './router';
import Login from './components/login';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './slices/authSlice';
export default function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');
  //   if (token && !isAuthenticated) {
  //     // Optionally, you can decode token to get user info
  //     dispatch(login({ email: user || 'Authenticated User' }));
  //   }
  // }, [dispatch, isAuthenticated, user]);

  if (!isAuthenticated) {
    return <Login />;
  }
  return (
    <div className="container-fluid vh-100 d-flex">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column">
        <Topbar username={user}/>
        <main className="flex-grow-1 overflow-auto p-3">
          <AppRouter />
        </main>
      </div>
    </div>
  );
}
