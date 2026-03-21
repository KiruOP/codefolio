import { Outlet } from 'react-router-dom';
import TopNav from '../components/TopNav';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Basic auth check
    const token = localStorage.getItem('codefolio_token');
    const userData = localStorage.getItem('codefolio_user');
    
    if (!token) {
      navigate('/login');
    } else if (userData) {
      setUser(JSON.parse(userData).user);
    }
  }, [navigate]);

  return (
    <div className="bg-background text-on-background min-h-screen">
      <TopNav user={user} />
      <div className="flex pt-16">
        <Sidebar />
        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 p-6 md:p-10 pb-24 md:pb-10 bg-surface min-h-[calc(100vh-4rem)]">
          <Outlet context={{ user, setUser }} />
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default DashboardLayout;
