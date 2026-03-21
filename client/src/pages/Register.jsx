import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      localStorage.setItem('codefolio_token', data.token);
      localStorage.setItem('codefolio_user', JSON.stringify(data));
      navigate('/dashboard'); // TODO: Redirect to proper dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-background font-body text-on-background min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-fixed blur-[120px] rounded-full"></div>
          <div className="absolute top-1/2 -right-24 w-64 h-64 bg-secondary-fixed blur-[100px] rounded-full"></div>
        </div>

        {/* Registration Card Container */}
        <div className="w-full max-w-md">
          <div className="bg-surface-container-lowest rounded-xl shadow-[0_12px_24px_-4px_rgba(20,27,43,0.04)] p-8 md:p-10 border border-outline-variant/10">
            {/* Logo & Header */}
            <div className="flex flex-col items-center mb-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                <span className="text-xl font-bold tracking-tighter text-slate-900">CodeFolio</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-on-surface text-center">Create your account</h1>
              <p className="text-on-surface-variant text-sm mt-2 font-medium">Join the community of elite builders.</p>
            </div>

            {error && (
              <div className="mb-6 flex items-center gap-3 p-4 bg-error-container rounded-xl border border-error/10">
                <span className="material-symbols-outlined text-error text-[20px]">error</span>
                <p className="text-on-error-container text-xs font-medium uppercase tracking-wider">{error}</p>
              </div>
            )}

            {/* Registration Form */}
            <form className="space-y-5" onSubmit={handleRegister}>
              {/* Username Field (Added) */}
              <div className="space-y-1.5">
                <label className="block text-[0.75rem] font-medium uppercase tracking-[0.05em] text-on-surface-variant px-1" htmlFor="username">Username</label>
                <div className="relative group">
                  <input
                    type="text"
                    id="username"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-lg py-3.5 px-4 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/40 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="block text-[0.75rem] font-medium uppercase tracking-[0.05em] text-on-surface-variant px-1" htmlFor="email">Email Address</label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-lg py-3.5 px-4 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/40 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="block text-[0.75rem] font-medium uppercase tracking-[0.05em] text-on-surface-variant px-1" htmlFor="password">Password</label>
                <div className="relative group">
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-lg py-3.5 px-4 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/40 transition-all outline-none"
                    required
                  />
                </div>
                <p className="text-[0.7rem] text-on-surface-variant/70 flex items-center gap-1.5 px-1">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Password must be at least 8 characters
                </p>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1.5">
                <label className="block text-[0.75rem] font-medium uppercase tracking-[0.05em] text-on-surface-variant px-1" htmlFor="confirm-password">Confirm Password</label>
                <div className="relative group">
                  <input
                    type="password"
                    id="confirm-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-lg py-3.5 px-4 text-on-surface placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/40 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full btn-gradient text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Create Account</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Footer Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant">
                Already have an account?
                <Link to="/login" className="text-primary font-bold hover:underline underline-offset-4 ml-1 transition-colors">Sign In</Link>
              </p>
            </div>
          </div>

          {/* Terms Note */}
          <p className="mt-8 text-center text-[0.75rem] text-on-surface-variant/60 font-medium px-4">
            By creating an account, you agree to our 
            <a href="#" className="underline hover:text-primary transition-colors ml-1">Terms of Service</a> and 
            <a href="#" className="underline hover:text-primary transition-colors ml-1">Privacy Policy</a>.
          </p>
        </div>
      </main>

      {/* Shared Footer Component */}
      <footer className="w-full mt-auto py-8">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-4 max-w-7xl mx-auto">
          <div className="text-[0.75rem] font-medium uppercase tracking-[0.05em] text-slate-400">
            © 2024 CodeFolio. Crafted for creators.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-[0.75rem] font-medium uppercase tracking-[0.05em] text-slate-400 hover:text-amber-600 transition-colors opacity-80 hover:opacity-100">Privacy Policy</a>
            <a href="#" className="text-[0.75rem] font-medium uppercase tracking-[0.05em] text-slate-400 hover:text-amber-600 transition-colors opacity-80 hover:opacity-100">Terms of Service</a>
            <a href="#" className="text-[0.75rem] font-medium uppercase tracking-[0.05em] text-slate-400 hover:text-amber-600 transition-colors opacity-80 hover:opacity-100">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;
