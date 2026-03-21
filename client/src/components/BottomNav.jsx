import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon, label, fill }) => {
    const active = isActive(to);
    return (
      <Link to={to} className={`flex flex-col items-center gap-1 ${active ? 'text-amber-700' : 'text-slate-400'}`}>
        <span className="material-symbols-outlined" style={{ fontVariationSettings: active && fill ? "'FILL' 1" : "'FILL' 0" }}>{icon}</span>
        <span className={`text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
      </Link>
    );
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200/50 flex justify-around items-center h-16 px-4 z-50">
      <NavLink to="/profile" icon="person" label="Profile" fill={true} />
      <NavLink to="/projects" icon="folder_open" label="Projects" />
      <NavLink to="/skills" icon="terminal" label="Skills" />
      <NavLink to="/dashboard" icon="dashboard" label="Workspace" />
    </nav>
  );
};

export default BottomNav;
