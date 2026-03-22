import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, icon, label }) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
          ${active
            ? 'text-amber-700 bg-amber-50 font-semibold'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
      >
        <span
          className={`material-symbols-outlined text-[20px] ${active ? 'text-amber-600' : 'text-slate-500'}`}
          style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
        >
          {icon}
        </span>
        {label}
      </Link>
    );
  };

  const displayName = user?.profile?.name || user?.username || 'Developer';
  const avatarLetter = displayName[0]?.toUpperCase() || 'D';

  return (
    <aside className="h-screen w-[240px] fixed left-0 top-0 bg-white border-r border-slate-200/70 hidden md:flex flex-col z-40 shadow-sm">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100">
        <Link to="/" className="text-lg font-extrabold tracking-tight text-[#855300]">CodeFolio</Link>
      </div>

      {/* User Identity */}
      {user && (
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
            {avatarLetter}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-slate-800 truncate">{displayName}</p>
            {user?.isPro && (
              <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider">PRO</span>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <NavLink to="/dashboard" icon="grid_view" label="Dashboard" />
        <NavLink to="/profile" icon="person" label="Profile" />
        <NavLink to="/projects" icon="folder_open" label="Projects" />
        <NavLink to="/skills" icon="code" label="Skills" />
        <NavLink to="/templates" icon="layers" label="Templates" />
      </nav>

      {/* View Portfolio CTA */}
      <div className="px-4 py-4 border-t border-slate-100">
        <Link
          to={`/${user?.username}`}
          className="w-full block text-center bg-gradient-to-br from-amber-600 to-amber-500 text-white font-semibold py-3 rounded-xl text-sm shadow-md shadow-amber-200 hover:opacity-95 active:scale-[0.98] transition-all"
        >
          View Portfolio
        </Link>
      </div>

      {/* Bottom Links */}
      <div className="px-3 pb-4 space-y-0.5 border-t border-slate-100 pt-3">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
          Settings
        </Link>
        <Link
          to="/support"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">help</span>
          Support
        </Link>
        <button
          onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 hover:text-red-600 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
