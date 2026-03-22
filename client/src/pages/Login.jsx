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
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-['Inter'] bg-slate-50 relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-[40%] h-[40%] bg-amber-100/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Logo header */}
      <header className="flex justify-center pt-10 pb-6 z-10">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-[#855300]">CodeFolio</Link>
      </header>

      {/* Card */}
      <main className="flex-1 flex items-start justify-center px-4 z-10">
        <div className="bg-white rounded-2xl shadow-[0_8px_32px_-4px_rgba(20,27,43,0.08)] border border-slate-100 w-full max-w-[480px] p-8 md:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 text-sm mt-1">Enter your credentials to access your workspace.</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-red-50 rounded-xl border border-red-100">
              <span className="material-symbols-outlined text-red-500 text-[18px]">error</span>
              <p className="text-red-700 text-xs font-semibold uppercase tracking-wider">{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-1.5">
              <label className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-slate-500" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/40 focus:bg-slate-50 transition-all outline-none text-sm"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-slate-500" htmlFor="password">Password</label>
                <Link to="/forgot-password" className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors">Forgot password?</Link>
              </div>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-100 border-none rounded-xl px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500/40 focus:bg-slate-50 transition-all outline-none text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-br from-amber-600 to-amber-500 text-white font-semibold py-3.5 rounded-xl shadow-md shadow-amber-200 hover:opacity-95 active:scale-[0.98] transition-all duration-200 text-sm"
            >
              Sign In
            </button>
          </form>

          <div className="mt-7 text-center text-sm text-slate-500">
            {"Don't have an account? "}
            <Link to="/register" className="text-amber-600 font-semibold hover:text-amber-700 transition-colors">Sign Up</Link>
          </div>
        </div>

        {/* Terms notice */}
        <div />
      </main>

      <div className="z-10 text-center py-6 text-xs text-slate-400">
        By creating an account, you agree to our{' '}
        <a href="#" className="underline hover:text-amber-600 transition-colors">Terms of Service</a>{' '}
        and{' '}
        <a href="#" className="underline hover:text-amber-600 transition-colors">Privacy Policy</a>.
      </div>

      <footer className="z-10 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="text-[11px] uppercase tracking-widest text-slate-400">© 2024 CodeFolio. Crafted for creators.</span>
        <div className="flex gap-6">
          <a href="#" className="text-[11px] uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors">Privacy Policy</a>
          <a href="#" className="text-[11px] uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors">Terms of Service</a>
          <a href="#" className="text-[11px] uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
