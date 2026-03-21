import { useOutletContext, Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useOutletContext();
  
  // Format name
  const displayName = user?.profile?.name || user?.username || 'Developer Name';

  return (
    <>
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-primary mb-2 block">Workspace Overview</span>
          <h2 className="text-4xl md:text-5xl font-black text-on-surface tracking-tighter leading-tight">
            Welcome back, <br /><span className="text-primary-container">{displayName}.</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-surface-container-high text-on-surface px-6 py-3 rounded-xl font-semibold text-sm hover:bg-surface-container-highest transition-colors active:scale-95">
            View Public Site
          </button>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile Summary Card */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-[24px] p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start relative overflow-hidden">
          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[0.7rem] font-bold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Active Theme: Minimal
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-2">Portfolio Identity</h3>
            <p className="text-on-surface-variant leading-relaxed max-w-md mb-8">
              Your profile is currently using the <span className="text-primary font-semibold">Minimalist</span> configuration. SEO optimization is active and your latest project is featured on the hero section.
            </p>
            <div className="flex gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/15">
                <p className="text-[0.65rem] uppercase font-bold text-on-surface-variant tracking-widest mb-1">Status</p>
                <p className="text-sm font-bold">Publicly Visible</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/15">
                <p className="text-[0.65rem] uppercase font-bold text-on-surface-variant tracking-widest mb-1">Last Update</p>
                <p className="text-sm font-bold">Just now</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-48 h-48 bg-surface-container rounded-2xl overflow-hidden shrink-0">
            <img 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
              alt="Workspace setup" 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            />
          </div>
          {/* Artistic Bleed Element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        {/* Quick Stats / Completion */}
        <div className="md:col-span-4 bg-inverse-surface rounded-[24px] p-8 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-6">Profile Completion</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary-container text-on-primary-container">
                    85% Complete
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-700">
                <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-container"></div>
              </div>
            </div>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <span className="material-symbols-outlined text-primary-fixed-dim text-lg">check_circle</span>
              Verified Skills
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <span className="material-symbols-outlined text-primary-fixed-dim text-lg">check_circle</span>
              Project Case Studies
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-400">
              <span className="material-symbols-outlined text-slate-600 text-lg">radio_button_unchecked</span>
              Connect Custom Domain
            </li>
          </ul>
        </div>

        {/* Add New Project Card */}
        <div className="md:col-span-4 bg-surface-container-high rounded-[24px] p-8 group cursor-pointer hover:bg-surface-container-highest transition-all duration-300 border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-3xl">add</span>
          </div>
          <h3 className="text-lg font-bold text-on-surface">Add New Project</h3>
          <p className="text-sm text-on-surface-variant mt-2">Create a new case study or import from GitHub</p>
        </div>

        {/* Projects Overview */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-[24px] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-on-surface">Active Projects</h3>
            <a href="#" className="text-sm font-bold text-primary flex items-center gap-1 hover:underline underline-offset-4">
              View All
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tertiary-fixed rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-tertiary-container">monitoring</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Fintech Dashboard App</h4>
                  <p className="text-xs text-on-surface-variant">Next.js • Tailwind • Supabase</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-on-surface">1,240</p>
                  <p className="text-[0.65rem] uppercase text-on-surface-variant font-bold tracking-tighter">Views</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary-fixed rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container">shopping_bag</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Eco-Commerce Platform</h4>
                  <p className="text-xs text-on-surface-variant">Shopify • React • Node</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-on-surface">892</p>
                  <p className="text-[0.65rem] uppercase text-on-surface-variant font-bold tracking-tighter">Views</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
