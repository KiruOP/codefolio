import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  // If user is already logged in, clicking login/get started goes to dashboard
  const isLoggedIn = !!localStorage.getItem('codefolio_token');

  const handleAuthLink = (e, path) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
          <Link to="/" className="text-xl font-bold tracking-tighter text-amber-700">CodeFolio</Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-amber-700 font-semibold border-b-2 border-amber-600 transition-all duration-200 ease-in-out py-1">Features</a>
            <a href="#templates" className="text-slate-600 hover:text-slate-900 transition-all duration-200 ease-in-out">Templates</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-all duration-200 ease-in-out">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/login"
              onClick={(e) => handleAuthLink(e, '/login')}
              className="hidden lg:flex active:scale-95 transition-transform text-slate-600 font-medium px-4 py-2 rounded-lg hover:bg-slate-100/50"
            >
              Log In
            </a>
            <a
              href="/register"
              onClick={(e) => handleAuthLink(e, '/register')}
              className="bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold px-6 py-2.5 rounded-lg shadow-sm active:scale-95 transition-transform"
            >
              Get Started
            </a>
          </div>
        </div>
        <div className="bg-slate-200/20 h-[1px] w-full"></div>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-6 pt-16 pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low text-on-primary-container text-xs font-bold tracking-widest uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Now in Private Beta
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-6 max-w-4xl leading-[1.1]">
              The easiest way to build your <span className="text-primary italic">developer</span> portfolio.
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mb-10 leading-relaxed">
              Stop wrestling with CSS. Connect your GitHub, choose a curated template, and deploy your professional site in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <a
                href="/register"
                onClick={(e) => handleAuthLink(e, '/register')}
                className="bg-gradient-to-br from-primary to-primary-container text-on-primary text-lg font-bold px-8 py-4 rounded-xl shadow-lg active:scale-95 transition-all text-white"
              >
                Get Started
              </a>
              <a href="#features" className="bg-surface-container-high text-on-surface text-lg font-bold px-8 py-4 rounded-xl active:scale-95 transition-all hover:bg-surface-variant">
                View Templates
              </a>
            </div>

            {/* Bento-style Preview Image */}
            <div className="w-full max-w-6xl aspect-[16/9] rounded-2xl bg-inverse-surface shadow-2xl overflow-hidden p-4 relative group">
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-transparent to-transparent opacity-40"></div>
              <div className="w-full h-full bg-surface-container-lowest rounded-xl border border-outline-variant/15 flex flex-col overflow-hidden shadow-inner">
                {/* Browser Shell UI */}
                <div className="h-10 border-b border-outline-variant/15 flex items-center px-4 gap-2 bg-surface-container-low">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="mx-auto bg-surface-container-lowest px-8 py-1 rounded-md text-[10px] text-on-surface-variant flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs">lock</span> portfolio.dev/alex-coder
                  </div>
                </div>
                {/* Canvas */}
                <div className="flex-1 flex gap-6 p-8 bg-surface">
                  <div className="w-1/3 space-y-4">
                    <div className="w-24 h-24 rounded-2xl bg-primary-fixed shadow-sm"></div>
                    <div className="h-6 w-3/4 bg-on-surface-variant/10 rounded"></div>
                    <div className="h-4 w-full bg-on-surface-variant/5 rounded"></div>
                    <div className="h-4 w-full bg-on-surface-variant/5 rounded"></div>
                    <div className="pt-4 flex gap-2">
                      <div className="h-8 w-20 bg-primary-container rounded-lg"></div>
                      <div className="h-8 w-8 bg-surface-container-high rounded-lg"></div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/5">
                      <div className="h-32 rounded-lg bg-surface-container-high mb-3"></div>
                      <div className="h-3 w-1/2 bg-on-surface-variant/10 rounded"></div>
                    </div>
                    <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/5">
                      <div className="h-32 rounded-lg bg-surface-container-high mb-3"></div>
                      <div className="h-3 w-1/2 bg-on-surface-variant/10 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-surface-container-low" id="features">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-label text-sm uppercase tracking-[0.2em] font-bold text-primary mb-4">Features</h2>
              <p className="text-4xl font-extrabold text-on-surface tracking-tight">Built for your professional growth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-14 h-14 bg-primary-container/20 rounded-xl flex items-center justify-center text-primary mb-8">
                  <span className="material-symbols-outlined text-3xl">bolt</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-4">One-click setup</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Import your projects directly from GitHub or GitLab. We handle the data fetching, you enjoy the results.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-14 h-14 bg-primary-container/20 rounded-xl flex items-center justify-center text-primary mb-8">
                  <span className="material-symbols-outlined text-3xl">palette</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-4">Customizable</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Tweak colors, typography, and layouts with a real-time editor that requires zero coding knowledge.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm hover:translate-y-[-4px] transition-transform duration-300">
                <div className="w-14 h-14 bg-primary-container/20 rounded-xl flex items-center justify-center text-primary mb-8">
                  <span className="material-symbols-outlined text-3xl">visibility</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-4">Live Preview</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  See exactly how your portfolio looks on desktop, tablet, and mobile with our built-in device simulator.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-inverse-surface rounded-[2rem] p-12 md:p-20 relative overflow-hidden text-center md:text-left">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 blur-[100px] -mr-32 -mt-32"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="max-w-xl">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to showcase your craft?</h2>
                  <p className="text-white/60 text-lg leading-relaxed">
                    Join 5,000+ developers who built their professional home with CodeFolio.
                  </p>
                </div>
                <a
                  href="/register"
                  onClick={(e) => handleAuthLink(e, '/register')}
                  className="whitespace-nowrap bg-white text-inverse-surface font-black px-10 py-5 rounded-2xl hover:bg-primary-fixed transition-colors text-lg active:scale-95"
                >
                  Get Started Free
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200/50 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link to="/" className="text-lg font-black text-amber-700">CodeFolio</Link>
              <p className="text-xs uppercase tracking-widest font-semibold text-slate-500">
                © {new Date().getFullYear()} CodeFolio. Crafted for developers.
              </p>
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-xs uppercase tracking-widest font-semibold text-slate-500 hover:text-amber-600 transition-colors underline-offset-4 hover:underline">Privacy</a>
              <a href="#" className="text-xs uppercase tracking-widest font-semibold text-slate-500 hover:text-amber-600 transition-colors underline-offset-4 hover:underline">Terms</a>
              <a href="#" className="text-xs uppercase tracking-widest font-semibold text-slate-500 hover:text-amber-600 transition-colors underline-offset-4 hover:underline">Github</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
