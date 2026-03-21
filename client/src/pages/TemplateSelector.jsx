import { useState, useEffect } from 'react';

const TemplateSelector = () => {
  const [activeTemplate, setActiveTemplate] = useState('minimal');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch user's current template from profile API
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('codefolio_token');
        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.templateId) {
          setActiveTemplate(data.templateId);
        }
      } catch (err) {
        console.error("Failed to load user config");
      }
    };
    fetchUser();
  }, []);

  const handleSelectTemplate = async (templateId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('codefolio_token');
      const res = await fetch('http://localhost:5000/api/users/template', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ templateId })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error updating template');
      }

      setActiveTemplate(templateId);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto flex-1">
      <header className="mb-12">
        <h3 className="text-3xl font-extrabold tracking-tight text-on-background mb-2">Template Selector</h3>
        <p className="text-on-surface-variant max-w-2xl">
          Select a visual framework that aligns with your personal brand. You can switch templates at any time without losing your content.
        </p>
      </header>

      {error && <div className="p-4 mb-6 bg-error-container text-on-error-container rounded-xl font-medium">{error}</div>}
      {success && <div className="p-4 mb-6 bg-emerald-100 text-emerald-800 rounded-xl font-medium">Template updated successfully!</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Minimal Template */}
        <div className={`relative flex flex-col bg-surface-container-lowest rounded-2xl ring-2 ${activeTemplate === 'minimal' ? 'ring-primary shadow-lg' : 'ring-black/[0.03] shadow-sm'} overflow-hidden transition-all duration-300`}>
          {activeTemplate === 'minimal' && (
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-primary text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Currently Active
            </div>
          )}
          <div className="h-80 bg-slate-50 overflow-hidden relative border-b border-outline-variant/20">
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">Minimal Layout Preview</div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <h4 className="text-xl font-bold text-on-background">Minimal Archive</h4>
              <p className="text-xs text-amber-700 font-medium tracking-wide uppercase mt-1">Editorial &amp; Professional</p>
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              A high-contrast, Swiss-inspired design that prioritizes whitespace and typography. Perfect for developers who value clarity, documentation, and a clean aesthetic.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button disabled={activeTemplate === 'minimal' || loading} onClick={() => handleSelectTemplate('minimal')} className={`flex items-center justify-center gap-2 py-2.5 px-4 font-bold text-sm rounded-xl transition-all ${activeTemplate === 'minimal' ? 'bg-primary text-white opacity-50 cursor-not-allowed' : 'bg-gradient-to-br from-primary to-primary-container text-white shadow-md active:scale-95'}`}>
                <span className="material-symbols-outlined text-lg">{activeTemplate === 'minimal' ? 'check' : 'brush'}</span>
                {activeTemplate === 'minimal' ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        </div>

        {/* Cyberpunk Template */}
        <div className={`relative flex flex-col bg-[#0a0c10] text-slate-200 rounded-2xl ring-2 ${activeTemplate === 'cyberpunk' ? 'ring-tertiary shadow-lg shadow-tertiary/20' : 'ring-black/[0.03] shadow-sm'} overflow-hidden transition-all duration-300`}>
          {activeTemplate === 'cyberpunk' && (
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-tertiary text-white text-[10px] font-bold tracking-widest uppercase rounded-full shadow-lg flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              Currently Active
            </div>
          )}
          <div className="h-80 bg-black overflow-hidden relative border-b border-tertiary/20">
            <div className="absolute inset-0 flex items-center justify-center text-tertiary font-mono">NEON TERMINAL PREVIEW</div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <h4 className="text-xl font-bold text-white">Neon Terminal</h4>
              <p className="text-xs text-tertiary font-medium tracking-wide uppercase mt-1">Futuristic &amp; High-Tech</p>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Inspired by classic IDEs and cyberpunk aesthetics. Features monospaced fonts, dark-mode optimization, and vibrant cyan accents that scream "Engineer."
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button disabled={activeTemplate === 'cyberpunk' || loading} onClick={() => handleSelectTemplate('cyberpunk')} className={`flex items-center justify-center gap-2 py-2.5 px-4 font-bold text-sm rounded-xl transition-all ${activeTemplate === 'cyberpunk' ? 'bg-tertiary text-white opacity-50 cursor-not-allowed' : 'bg-tertiary text-black shadow-md shadow-tertiary/20 active:scale-95'}`}>
                <span className="material-symbols-outlined text-lg">{activeTemplate === 'cyberpunk' ? 'check' : 'brush'}</span>
                {activeTemplate === 'cyberpunk' ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
