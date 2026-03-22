import { useOutletContext, Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useOutletContext();

  const displayName = user?.profile?.name || user?.username || 'Developer';
  const username = user?.username;
  const livePreviewUrl = username ? `${window.location.origin}/${username}` : null;
  const portfolioUrl = username ? `/${username}` : null;

  return (
    <div className="flex flex-col h-full">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-primary mb-2 block">Workspace</span>
          <h2 className="text-3xl md:text-4xl font-black text-on-surface tracking-tighter leading-tight">
            Welcome back, <br /><span className="text-primary-container">{displayName}.</span>
          </h2>
        </div>
        <div className="flex items-center gap-4">
          {portfolioUrl && (
            <Link
              to={portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all shadow-[0_4px_12px_rgba(133,83,0,0.2)] active:scale-95 flex items-center gap-2"
            >
              Open Full Site <span className="material-symbols-outlined text-sm">open_in_new</span>
            </Link>
          )}
        </div>
      </header>

      {/* Main Split Interface */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        {/* Left Column: Stats & Actions */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-surface-container-lowest rounded-[24px] p-6 shadow-sm border border-outline-variant/10">
            <h3 className="text-lg font-bold text-on-surface mb-2">Live Status</h3>
            <div className="flex items-center gap-3 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <p className="text-sm font-semibold text-emerald-700">Portfolio Compiled</p>
            </div>
            
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/15 mb-4 group hover:bg-surface-container transition-colors">
              <p className="text-[0.65rem] uppercase font-bold text-on-surface-variant tracking-widest mb-1">Active Template</p>
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold capitalize text-primary">{user?.templateId || 'minimal'}</p>
                <Link to="/templates" className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Link to="/projects" className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/15 hover:bg-surface-container transition-colors text-center shadow-sm hover:shadow-md">
                <span className="material-symbols-outlined text-on-surface-variant mb-2">folder_open</span>
                <p className="text-xs font-bold text-on-surface">Projects</p>
              </Link>
              <Link to="/skills" className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/15 hover:bg-surface-container transition-colors text-center shadow-sm hover:shadow-md">
                <span className="material-symbols-outlined text-on-surface-variant mb-2">terminal</span>
                <p className="text-xs font-bold text-on-surface">Skills</p>
              </Link>
            </div>
            
            <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">Checklist</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                Configure Profile
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <span className={user?.skills?.length > 0 ? "material-symbols-outlined text-emerald-500 text-base" : "material-symbols-outlined text-slate-300 text-base"}>
                  {user?.skills?.length > 0 ? "check_circle" : "radio_button_unchecked"}
                </span>
                Add Skillset
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-500">
                <span className="material-symbols-outlined text-slate-300 text-base">radio_button_unchecked</span>
                Publish First Case Study
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Live Iframe Preview */}
        <div className="w-full lg:w-2/3 flex flex-col bg-surface-container-high rounded-[24px] overflow-hidden shadow-inner border border-outline-variant/30 flex-1 min-h-[500px] lg:min-h-[700px]">
          <div className="bg-surface-container-highest px-4 py-2 border-b border-outline-variant/20 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-error/40 mt-0.5"></div>
              <div className="w-3 h-3 rounded-full bg-primary-container/40 mt-0.5"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/40 mt-0.5"></div>
            </div>
            <div className="text-[0.65rem] font-mono tracking-widest text-on-surface-variant uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-[12px]">visibility</span>
              {username ? `localhost:5173/${username}` : 'Live Preview'}
            </div>
            <div className="w-12"></div>
          </div>
          
          <div className="flex-1 w-full bg-white relative">
            {livePreviewUrl ? (
              <iframe 
                src={livePreviewUrl} 
                className="absolute inset-0 w-full h-full border-none"
                title="Portfolio Live Preview"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                <div className="text-center">
                  <span className="material-symbols-outlined text-4xl mb-2 block animate-spin" style={{animationDuration:'1.5s'}}>refresh</span>
                  Loading preview...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
