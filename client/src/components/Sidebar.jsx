import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon, label, fill }) => {
    const active = isActive(to);
    return (
      <Link 
        to={to}
        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium font-inter rounded-lg cursor-pointer transition-all duration-200 
          ${active 
            ? 'text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 translate-x-1' 
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:translate-x-1'}`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: active && fill ? "'FILL' 1" : "'FILL' 0" }}>{icon}</span>
        {label}
      </Link>
    );
  };

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 pt-20 bg-slate-50 dark:bg-slate-950 border-r border-slate-200/50 dark:border-slate-800/50 hidden md:flex flex-col gap-2 p-4 z-40">
      <div className="px-3 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-amber-700">Workspace</h2>
          <p className="text-xs text-slate-500 font-medium">Manage your digital atelier</p>
        </div>
        {user?.isPro && (
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-[10px] font-bold text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
            PRO
          </span>
        )}
      </div>

      <nav className="flex-1 space-y-1">
        <NavLink to="/profile" icon="person" label="Profile" fill={true} />
        <NavLink to="/projects" icon="folder_open" label="Projects" />
        <NavLink to="/skills" icon="terminal" label="Skills" />
        <NavLink to="/templates" icon="layers" label="Templates" />
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-200/50 dark:border-slate-800/50 space-y-1">
        <button className="w-full text-left bg-gradient-to-br from-primary to-primary-container text-white py-2 px-4 rounded-lg text-sm font-semibold mb-4 shadow-sm hover:opacity-90 transition-opacity">
          View Portfolio
        </button>
        <Link to="/support" className="flex items-center gap-3 px-3 py-2 text-sm font-medium font-inter text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg cursor-pointer transition-all">
          <span className="material-symbols-outlined">help</span>
          Support
        </Link>
        <button onClick={() => { localStorage.clear(); window.location.href='/login' }} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium font-inter text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg cursor-pointer transition-all">
          <span className="material-symbols-outlined">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
