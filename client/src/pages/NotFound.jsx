import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed min-h-screen flex flex-col justify-between">
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-primary-container/10 blur-[120px] rounded-full"></div>
          <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-surface-container-highest/30 blur-[100px] rounded-[100%]"></div>
        </div>

        <div className="z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="mb-12 relative">
            <div className="text-[12rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary-container leading-none opacity-20 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-surface-container-lowest shadow-xl rounded-xl p-8 border border-outline-variant/10 backdrop-blur-sm">
                <span className="material-symbols-outlined text-primary text-7xl" style={{ fontVariationSettings: '"FILL" 1' }}>terminal</span>
              </div>
            </div>
          </div>

          <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-6">Page Not Found</h1>
          <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed mb-10 max-w-md">
            The page you are looking for doesn't exist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mb-16">
            <Link to="/dashboard" className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-white font-semibold rounded-lg shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2">
              <span className="material-symbols-outlined">dashboard</span> Dashboard
            </Link>
            <Link to="/" className="px-8 py-4 bg-surface-container-high text-on-surface font-semibold rounded-lg hover:bg-surface-variant transition-all duration-300 flex items-center gap-2">
              <span className="material-symbols-outlined">home</span> Home
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full opacity-60">
            <div className="p-6 rounded-xl bg-surface-container-low flex flex-col items-center text-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant">search</span>
              <span className="font-medium text-xs tracking-widest uppercase">Search Showcase</span>
            </div>
            <div className="p-6 rounded-xl bg-surface-container-low flex flex-col items-center text-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant">article</span>
              <span className="font-medium text-xs tracking-widest uppercase">Read Articles</span>
            </div>
            <div className="p-6 rounded-xl bg-surface-container-low flex flex-col items-center text-center gap-3">
              <span className="material-symbols-outlined text-on-surface-variant">mail</span>
              <span className="font-medium text-xs tracking-widest uppercase">Contact Support</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/50 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="text-lg font-black text-slate-900">CodeFolio</div>
              <p className="text-xs uppercase tracking-widest font-semibold text-slate-500">© 2024 CodeFolio. Crafted for developers.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
