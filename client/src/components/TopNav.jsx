import { Link } from 'react-router-dom';

const TopNav = ({ user }) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm shadow-amber-900/5 flex items-center justify-between px-6 h-16 w-full">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-slate-50">CodeFolio</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <nav className="flex gap-6">
          <Link to="/dashboard" className="text-amber-700 dark:text-amber-500 font-semibold font-inter tracking-tight hover:text-amber-600 transition-colors">Workspace</Link>
          <Link to="/explore" className="text-slate-500 dark:text-slate-400 font-inter tracking-tight hover:text-amber-600 transition-colors">Explore</Link>
          <Link to="/community" className="text-slate-500 dark:text-slate-400 font-inter tracking-tight hover:text-amber-600 transition-colors">Community</Link>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-500 hover:text-amber-600 transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
        </button>
        <button className="p-2 text-slate-500 hover:text-amber-600 transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>settings</span>
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/20">
          <img alt="User profile avatar" className="w-full h-full object-cover" src={user?.profile?.avatarUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
