import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col font-['Inter'] bg-slate-50 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[35%] h-[35%] bg-amber-100/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[25%] h-[25%] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 z-10">
        {/* 404 Visual */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Large 404 numbers */}
          <span className="text-[10rem] md:text-[13rem] font-black tracking-tighter text-[#d8c3a8]/60 select-none leading-none">4</span>
          {/* Terminal Icon Box */}
          <div className="mx-2 md:mx-4 flex flex-col items-center justify-center">
            {/* Antenna */}
            <div className="w-px h-6 bg-[#c4a77d] mb-1" />
            <div className="w-2 h-2 border-2 border-[#c4a77d] rotate-45 -mb-3 bg-transparent" />
            <div className="bg-white border-2 border-[#d8c3a8] rounded-xl p-4 shadow-md flex items-center justify-center">
              <span className="material-symbols-outlined text-[#855300] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
            </div>
          </div>
          <span className="text-[10rem] md:text-[13rem] font-black tracking-tighter text-[#d8c3a8]/60 select-none leading-none">4</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Page Not Found</h1>
        <p className="text-slate-500 text-base mb-10">The page you are looking for doesn't exist.</p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/dashboard"
            className="px-7 py-3 bg-gradient-to-br from-amber-600 to-amber-500 text-white font-semibold rounded-xl shadow-md shadow-amber-200 hover:opacity-95 active:scale-[0.98] transition-all flex items-center gap-2 text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
            Dashboard
          </Link>
          <Link
            to="/"
            className="px-7 py-3 bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold rounded-xl transition-all flex items-center gap-2 text-sm"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="z-10 border-t border-slate-200 px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <Link to="/" className="text-sm font-extrabold text-[#855300]">CodeFolio</Link>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-slate-400 hover:text-amber-600 transition-colors">Privacy</a>
          <a href="#" className="text-xs text-slate-400 hover:text-amber-600 transition-colors">Terms</a>
          <a href="#" className="text-xs text-slate-400 hover:text-amber-600 transition-colors">Github</a>
          <a href="#" className="text-xs text-slate-400 hover:text-amber-600 transition-colors">Twitter</a>
        </div>
        <span className="text-xs text-slate-400">© 2024 CodeFolio. Crafted with intentionality.</span>
      </footer>
    </div>
  );
};

export default NotFound;
