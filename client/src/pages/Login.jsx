import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('codefolio_token', data.token);
      localStorage.setItem('codefolio_user', JSON.stringify(data));
      navigate('/dashboard'); // TODO: Redirect to proper dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
        {/* Subtle background decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-container/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-tertiary-container/10 rounded-full blur-[100px]"></div>

        <div className="w-full max-w-[440px] z-10">
          {/* Brand Identity Anchor */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center mb-4 shadow-xl shadow-primary/10">
              <span className="material-symbols-outlined text-on-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tighter text-on-surface">CodeFolio</h1>
          </div>

          {/* Login Card */}
          <div className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-[0_12px_24px_-4px_rgba(20,27,43,0.04)] border border-outline-variant/15">
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-on-surface mb-2">Welcome Back</h2>
              <p className="text-on-surface-variant text-sm leading-relaxed">Enter your credentials to access your workspace.</p>
            </div>

            {/* Error Message State */}
            {error && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-error-container rounded-xl border border-error/10">
                <span className="material-symbols-outlined text-error text-[20px]">error</span>
                <p className="text-on-error-container text-xs font-medium uppercase tracking-wider">{error}</p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label className="text-[0.75rem] font-medium uppercase tracking-[0.05em] text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/40 focus:bg-surface-bright transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[0.75rem] font-medium uppercase tracking-[0.05em] text-on-surface-variant" htmlFor="password">Password</label>
                  <a href="#" className="text-[0.75rem] font-medium text-primary hover:text-primary-container transition-colors">Forgot password?</a>
                </div>
                <div className="relative group">
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/40 focus:bg-surface-bright transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold py-4 rounded-xl shadow-lg shadow-primary/10 hover:scale-[0.98] active:scale-95 transition-all duration-200"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
              <p className="text-on-surface-variant text-sm">
                {"Don't have an account? "}
                <Link to="/register" className="text-primary font-semibold hover:text-primary-container transition-colors ml-1">Sign Up</Link>
              </p>
            </div>
          </div>

          {/* Contextual Social Proof / Info */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-surface-container-low/50 rounded-xl">
              <span className="material-symbols-outlined text-primary text-xl">shield_lock</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Secure Session</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-surface-container-low/50 rounded-xl">
              <span className="material-symbols-outlined text-primary text-xl">cloud_done</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">Cloud Sync</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Component Integration */}
      <footer className="w-full mt-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4 max-w-7xl mx-auto">
          <span className="text-[0.75rem] font-medium uppercase tracking-[0.05em] text-slate-400 dark:text-slate-500">
            © 2024 CodeFolio. Crafted for creators.
          </span>
          <div className="flex gap-8">
            <a href="#" className="text-[0.75rem] font-medium uppercase tracking-[0.05em] text-slate-400 dark:text-slate-500 hover:text-amber-600 transition-colors opacity-80 hover:opacity-100">Privacy Policy</a>
            <a href="#" className="text-[0.75rem] font-medium uppercase tracking-[0.05em] text-slate-400 dark:text-slate-500 hover:text-amber-600 transition-colors opacity-80 hover:opacity-100">Terms of Service</a>
            <a href="#" className="text-[0.75rem] font-medium uppercase tracking-[0.05em] text-slate-400 dark:text-slate-500 hover:text-amber-600 transition-colors opacity-80 hover:opacity-100">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
