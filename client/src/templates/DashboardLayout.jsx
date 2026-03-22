import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { useEffect, useState } from 'react';

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('codefolio_token');
    const userData = localStorage.getItem('codefolio_user');
    
    if (!token) {
      navigate('/login');
    } else if (userData) {
      setUser(JSON.parse(userData).user);
    }
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
