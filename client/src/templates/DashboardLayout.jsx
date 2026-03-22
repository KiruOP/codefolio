import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { useEffect, useState } from 'react';

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('codefolio_token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Always fetch fresh user data from the backend on load
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) {
          // Token expired or invalid
          localStorage.removeItem('codefolio_token');
          localStorage.removeItem('codefolio_user');
          navigate('/login');
          return;
        }
        const data = await res.json();
        setUser(data);
        // Keep localStorage in sync so other parts of app can read it
        localStorage.setItem('codefolio_user', JSON.stringify({ user: data, token }));
      } catch {
        // If the fetch fails (server down), fall back to cached data
        const cached = localStorage.getItem('codefolio_user');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            // Handle both { user: {...} } and flat { _id, username, ... } formats
            setUser(parsed.user || parsed);
          } catch {}
        }
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <Sidebar user={user} />
      {/* Main Content Area - offset by sidebar width */}
      <main className="md:ml-[240px] p-6 md:p-10 pb-24 md:pb-10 min-h-screen">
        <Outlet context={{ user, setUser }} />
      </main>
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
