import { useState, useEffect } from 'react';
import API_URL from '../config';

const CyberpunkTemplate = ({ data }) => {
  const { user, projects, skills } = data;
  const profile = user.profile || {};
  const { name, bio, company, location, socialLinks, resumeData, resumeName } = profile;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll spy
  useEffect(() => {
    const sections = ['home', 'projects', 'skills', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      let current = 'home';
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API_URL}/api/portfolio/${user.username}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('err');
      }
    } catch {
      setStatus('err');
    }
    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <div className="bg-[#131313] text-[#e5e2e1] selection:bg-[#00f2ff] selection:text-[#00363a] min-h-screen font-['Manrope'] overflow-x-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        .cyber-bg {
            background-color: #131313;
            background-image: radial-gradient(circle at 2px 2px, rgba(0, 242, 255, 0.05) 1px, transparent 0);
            background-size: 40px 40px;
        }
        .scanline {
            width: 100%;
            height: 100px;
            z-index: 100;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 242, 255, 0.05) 50%, rgba(0, 0, 0, 0) 100%);
            opacity: 0.1;
            position: fixed;
            pointer-events: none;
            animation: scrolldown 10s linear infinite;
        }
        @keyframes scrolldown {
            0% { top: -100%; }
            100% { top: 200%; }
        }
        .clip-path-cta {
            clip-path: polygon(0 0, 90% 0, 100% 30%, 100% 100%, 10% 100%, 0 70%);
        }
        .glow-text {
            text-shadow: 0 0 12px rgba(0, 242, 255, 0.6);
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 20s linear infinite;
        }
      `}} />
      
      <div className="cyber-bg absolute inset-0 z-0 opacity-50 pointer-events-none"></div>
      <div className="scanline"></div>

      {/* TopAppBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#131313]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_0_20px_rgba(0,242,255,0.15)]">
        <a href={`/${user.username}`} className="text-2xl font-black text-cyan-400 drop-shadow-[0_0_8px_rgba(0,242,255,0.8)] font-['Space_Grotesk'] uppercase tracking-tighter hover:text-white transition-colors">
          &lt;{user.username} /&gt;
        </a>
        <div className="hidden md:flex items-center gap-8 font-['Space_Grotesk'] uppercase tracking-tighter text-sm">
          {[['home','HOME'],['projects','PROJECTS'],['skills','STACK'],['contact','TERMINAL']].map(([id,label]) => (
            <a key={id} href={`#${id}`}
              className={activeSection === id
                ? 'text-cyan-400 border-b-2 border-cyan-400 pb-1 px-2'
                : 'text-cyan-900/60 hover:text-cyan-400 transition-all duration-200 hover:bg-cyan-500/10 px-2 py-1'}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-16 overflow-hidden" id="home">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00f2ff]/20 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center max-w-5xl">
          <div className="inline-block mb-4 px-3 py-1 bg-[#2a2a2a] border-l-2 border-[#00f2ff]">
            <p className="font-['Space_Grotesk'] text-xs tracking-[0.3em] text-[#00dbe7] uppercase">Status: Sequence_Active</p>
          </div>
          <h1 className="font-['Space_Grotesk'] text-6xl md:text-9xl font-extrabold tracking-tighter text-[#e5e2e1] glow-text uppercase leading-none">
            {name || user.username}
          </h1>
          <p className="mt-6 font-['Space_Grotesk'] text-xl md:text-2xl text-[#00dbe7]/80 tracking-widest uppercase">
            {bio || "Neural Interface Designer"} <br />
            {company && <span className="text-[#ebb2ff] text-sm mt-2 block">AT_{company}</span>}
          </p>
          <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="#contact" className="group relative px-10 py-4 bg-[#00f2ff] text-[#006a71] font-['Space_Grotesk'] font-bold uppercase tracking-widest clip-path-cta hover:bg-white transition-colors duration-300 inline-block text-center">
              INITIALIZE_CONTACT
            </a>
            <a href="#projects" className="px-10 py-4 border border-[#00f2ff]/20 text-[#00f2ff] font-['Space_Grotesk'] font-bold uppercase tracking-widest hover:bg-[#00f2ff]/10 transition-all duration-300 inline-block text-center">
              ACCESS_DATA
            </a>
            {resumeData && (
              <a
                href={resumeData}
                download={resumeName || 'resume.pdf'}
                className="px-10 py-4 border border-[#ebb2ff]/30 text-[#ebb2ff] font-['Space_Grotesk'] font-bold uppercase tracking-widest hover:bg-[#ebb2ff]/10 transition-all duration-300 inline-block text-center flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                DOWNLOAD_CV
              </a>
            )}
          </div>
        </div>
        <div className="absolute bottom-10 left-6 flex flex-col gap-2 opacity-50">
          <div className="h-1 w-12 bg-[#00f2ff]"></div>
          <div className="h-1 w-24 bg-[#00f2ff]/40"></div>
          <p className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#00f2ff]">System_Clock: {new Date().toLocaleTimeString()}</p>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="py-24 px-6 bg-[#0e0e0e] relative z-20" id="projects">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-[#3a494b]/20 pb-4">
            <div>
              <h2 className="font-['Space_Grotesk'] text-4xl font-bold text-[#e5e2e1] uppercase tracking-tighter glow-text">Classified_Projects</h2>
              <p className="font-['Space_Grotesk'] text-[#00dbe7] text-xs mt-2 uppercase">Directory: /home/{user.username}/production</p>
            </div>
            <div className="hidden md:block text-right">
              <span className="font-['Space_Grotesk'] text-[10px] text-[#849495] uppercase tracking-widest">Filtered By: Latest_Deployments</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects && projects.length > 0 ? projects.map((proj, idx) => (
              <div key={idx} className="group relative bg-[#2a2a2a] border-l-2 border-transparent hover:border-[#00f2ff] transition-all duration-500 overflow-hidden">
                <div className="aspect-video relative overflow-hidden bg-black flex items-center justify-center">
                  {proj.image ? (
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60" />
                  ) : (
                    <span className="material-symbols-outlined text-6xl text-cyan-900 group-hover:text-cyan-500 transition-colors">memory</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a] to-transparent"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-['Space_Grotesk'] text-2xl font-bold uppercase text-[#e5e2e1] group-hover:text-[#00f2ff] transition-colors">{proj.title}</h3>
                    <span className="font-['Space_Grotesk'] text-[10px] text-[#ebb2ff] border border-[#ebb2ff]/20 px-2 py-0.5">DEPLOYED</span>
                  </div>
                  <p className="text-[#b9cacb] text-sm font-['Manrope'] mb-6 leading-relaxed h-16 overflow-hidden">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8 h-8 overflow-hidden">
                    {proj.techStack?.slice(0, 3).map((tech, i) => (
                      <span key={i} className="font-['Space_Grotesk'] text-[10px] bg-[#201f1f] py-1 px-2 text-[#849495] uppercase">{tech}</span>
                    ))}
                    {proj.techStack?.length > 3 && <span className="font-['Space_Grotesk'] text-[10px] bg-[#201f1f] py-1 px-2 text-[#849495] uppercase">...</span>}
                  </div>
                  <div className="flex gap-4">
                    {proj.liveLink && (
                      <a href={proj.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#00f2ff] font-['Space_Grotesk'] text-xs uppercase tracking-widest hover:gap-3 transition-all">
                        Execute_Live <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </a>
                    )}
                    {proj.repoLink && (
                      <a href={proj.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#ebb2ff] font-['Space_Grotesk'] text-xs uppercase tracking-widest hover:gap-3 transition-all">
                        Source_Code <span className="material-symbols-outlined text-sm">code</span>
                      </a>
                    )}
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-0.5 bg-[#00f2ff]/0 group-hover:bg-[#00f2ff]/100 group-hover:animate-pulse shadow-[0_0_10px_rgba(0,242,255,0.8)]"></div>
              </div>
            )) : (
              <div className="col-span-full py-12 text-center text-cyan-900 border border-cyan-900/50 bg-[#1a1a1a] font-mono">
                [NO_DATA_FOUND_IN_ARCHIVES]
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Skills / Tech Stack Section */}
      <section className="py-24 px-6 relative overflow-hidden z-20 bg-[#131313]" id="skills">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#00f2ff] to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-['Space_Grotesk'] text-5xl font-bold uppercase tracking-tighter mb-4 glow-text">Core_Systems</h2>
          <p className="font-['Manrope'] text-[#b9cacb] max-w-xl mx-auto">The foundational architecture utilized to bridge the gap between human perception and digital execution.</p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills && skills.length > 0 ? skills.map((skillGroup, idx) => (
            <div key={idx} className="p-8 bg-[#2a2a2a] border-t-2 border-[#00f2ff]/30 hover:border-[#00f2ff] transition-all group">
              <span className="material-symbols-outlined text-[#ebb2ff] mb-4 text-3xl">terminal</span>
              <h4 className="font-['Space_Grotesk'] font-bold uppercase mb-6 tracking-widest text-[#e5e2e1]">{skillGroup.category.replace(/ /g, '_')}</h4>
              <div className="space-y-3">
                {skillGroup.items?.map((item, i) => {
                  // Generate an abstract progress bar percentage for cyberpunk aesthetic
                  const fakePercentage = 75 + ((i * 7 + idx * 11) % 25);
                  return (
                    <div key={i} className="mb-4">
                      <div className="flex justify-between items-center text-xs font-['Space_Grotesk'] mb-1">
                        <span className="text-[#b9cacb] group-hover:text-[#00f2ff] transition-colors">{item.toUpperCase()}</span>
                        <span className="text-[#00f2ff] opacity-40">{fakePercentage}%</span>
                      </div>
                      <div className="h-0.5 bg-[#3a494b]/50 w-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-[#00f2ff] shadow-[0_0_8px_rgba(0,242,255,0.8)] mix-blend-screen" style={{width: `${fakePercentage}%`}}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center text-cyan-800 font-mono py-8">SYSTEM_SCAN: COMPONENTS_NOT_DETECTED</div>
          )}
        </div>
      </section>

      {/* Terminal Section (Contact) */}
      <section className="py-24 px-6 bg-[#131313] z-20 relative" id="contact">
        <div className="max-w-4xl mx-auto">
          <div className="w-full bg-[#2a2a2a] border border-[#3a494b]/50 shadow-[0_0_30px_rgba(0,242,255,0.05)] overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-[#201f1f] flex items-center justify-between px-4 py-2 border-b border-[#3a494b]/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ffb4ab]/50"></div>
                <div className="w-3 h-3 rounded-full bg-[#ebb2ff]/50"></div>
                <div className="w-3 h-3 rounded-full bg-[#00f2ff]/50"></div>
              </div>
              <div className="font-['Space_Grotesk'] text-[10px] uppercase tracking-widest text-[#849495]">Terminal — Contact_Secure_Channel</div>
              <div className="w-12"></div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 md:p-8 font-mono text-sm min-h-[400px]">
              <div className="mb-6">
                <p className="text-[#00f2ff]" style={{textTransform: 'uppercase'}}>{user.username} [Version 2.0.4]</p>
                <p className="text-[#b9cacb]">© {new Date().getFullYear()} NEON_TERMINAL. All rights reserved.</p>
              </div>

              <div className="space-y-2">
                <p className="text-[#e5e2e1]">USER@TERMINAL:~$ <span className="text-[#ebb2ff]">cat</span> welcome_message.txt</p>
                <p className="text-[#b9cacb] mb-4 ml-4">Establish a secure handshake. Input your transmission data below to initialize communication with the architect.</p>

                <p className="text-[#e5e2e1]">USER@TERMINAL:~$ <span className="text-[#ebb2ff]">sudo</span> initiate contact --mode=secure</p>
                <p className="text-[#00dbe7] ml-4">[HANDSHAKE_INITIALIZED] Waiting for input...</p>
                <p className="text-[#00dbe7] ml-4">[LOCATION] {location || 'UNKNOWN'}</p>

                {status === 'success' && <p className="text-emerald-400 ml-4 font-bold mt-4">&gt;&gt; [SYS_ACK]: DATA_PACKET_DELIVERED_SUCCESSFULLY.</p>}
                {status === 'err' && <p className="text-red-400 ml-4 font-bold mt-4">&gt;&gt; [SYS_ERR]: TRANSMISSION_FAILED. CONNECTION_LOST.</p>}

                <form className="mt-8 space-y-6 max-w-lg" onSubmit={handleContactSubmit}>
                  <div className="flex flex-col gap-1">
                    <label className="font-['Space_Grotesk'] text-[10px] text-[#849495] text-left uppercase">IDENTIFIER_NAME</label>
                    <div className="flex items-center">
                      <span className="text-[#00f2ff] mr-2">&gt;</span>
                      <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-[#00dbe7]/30 focus:border-[#00f2ff] focus:ring-0 text-[#00f2ff] font-['Space_Grotesk'] uppercase px-0 py-2 transition-all outline-none" placeholder="SUBJECT_01" type="text"/>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="font-['Space_Grotesk'] text-[10px] text-[#849495] text-left uppercase">NEURAL_LINK_ADDRESS</label>
                    <div className="flex items-center">
                      <span className="text-[#00f2ff] mr-2">&gt;</span>
                      <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-[#00dbe7]/30 focus:border-[#00f2ff] focus:ring-0 text-[#00f2ff] font-['Space_Grotesk'] uppercase px-0 py-2 transition-all outline-none" placeholder="USER@NETWORK.COM" type="email"/>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="font-['Space_Grotesk'] text-[10px] text-[#849495] text-left uppercase">ENCRYPTED_MESSAGE</label>
                    <div className="flex items-start mt-2">
                      <span className="text-[#00f2ff] mr-2 mt-1">&gt;</span>
                      <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-[#1c1b1b] border border-[#00dbe7]/30 focus:border-[#00f2ff] focus:ring-0 text-[#00f2ff] font-['Space_Grotesk'] p-3 transition-all resize-none outline-none" placeholder="ENTER_TRANSMISSION_DATA" rows="4"></textarea>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex items-center">
                    <button disabled={status === 'sending'} type="submit" className="bg-transparent border border-[#00f2ff] text-[#00f2ff] px-6 py-2 font-['Space_Grotesk'] font-bold uppercase tracking-widest hover:bg-[#00f2ff] hover:text-[#006a71] transition-all scale-100 active:scale-95 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[#00f2ff]">
                      {status === 'sending' ? 'TRANSMITTING...' : 'TRANSMIT_DATA'}
                    </button>
                  </div>
                </form>

                <div className="mt-8 flex items-center gap-2">
                  <span className="text-[#e5e2e1]">USER@TERMINAL:~$</span>
                  <span className="w-2 h-5 bg-[#00f2ff] animate-pulse"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0e0e0e] border-t border-cyan-950/50 relative z-20">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="text-[#00dbe7] font-bold font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em]">&lt;{user.username} /&gt;</div>
          <p className="font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#849495]">©{new Date().getFullYear()} NEON_TERMINAL // ENCRYPTED</p>
        </div>
        <div className="flex gap-8 font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em]">
          {socialLinks?.github && <a className="text-[#849495] hover:text-[#ebb2ff] transition-colors duration-300 hover:translate-y-[-2px]" href={socialLinks.github} target="_blank" rel="noopener noreferrer">GITHUB</a>}
          {socialLinks?.linkedin && <a className="text-[#849495] hover:text-[#ebb2ff] transition-colors duration-300 hover:translate-y-[-2px]" href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN</a>}
          {socialLinks?.twitter && <a className="text-[#849495] hover:text-[#ebb2ff] transition-colors duration-300 hover:translate-y-[-2px]" href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">TWITTER</a>}
        </div>
        <div className="flex items-center gap-2 font-['Space_Grotesk'] text-[10px] uppercase tracking-[0.2em] text-[#00dbe7]">
          <span className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse glow-text"></span>
          SYSTEM_STATUS: ONLINE
        </div>
      </footer>

      {user.isPro && (
        <div className="fixed top-24 right-6 z-[100] bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#00f2ff] text-[#00f2ff] font-['Space_Grotesk'] font-bold text-[10px] tracking-[0.2em] uppercase px-4 py-2 flex items-center gap-2 shadow-[0_0_15px_rgba(0,242,255,0.4)]">
          CODEFOLIO // <span className="text-[#ebb2ff]">PRO_NODE</span>
        </div>
      )}

      {/* Data Ticker */}
      <div className="fixed bottom-0 w-full overflow-hidden bg-[#0e0e0e] h-6 border-t border-[#3a494b]/30 flex items-center z-[100]">
        <div className="flex whitespace-nowrap animate-marquee">
          <span className="font-['Space_Grotesk'] text-[10px] text-[#ebb2ff] uppercase tracking-[0.3em] px-8">System_Status: Online</span>
          <span className="font-['Space_Grotesk'] text-[10px] text-[#00f2ff] uppercase tracking-[0.3em] px-8">Identity_Hash: {user._id?.substring(0,8)}</span>
          <span className="font-['Space_Grotesk'] text-[10px] text-[#ebb2ff] uppercase tracking-[0.3em] px-8">Encryption_Level: Quantum_Grade</span>
          <span className="font-['Space_Grotesk'] text-[10px] text-[#00f2ff] uppercase tracking-[0.3em] px-8">Uptime: 99.9999%</span>
          <span className="font-['Space_Grotesk'] text-[10px] text-[#ebb2ff] uppercase tracking-[0.3em] px-8">Node_Link: ACTIVE</span>
          {/* Repeat */}
          <span className="font-['Space_Grotesk'] text-[10px] text-[#ebb2ff] uppercase tracking-[0.3em] px-8">System_Status: Online</span>
          <span className="font-['Space_Grotesk'] text-[10px] text-[#00f2ff] uppercase tracking-[0.3em] px-8">Identity_Hash: {user._id?.substring(0,8)}</span>
          <span className="font-['Space_Grotesk'] text-[10px] text-[#ebb2ff] uppercase tracking-[0.3em] px-8">Encryption_Level: Quantum_Grade</span>
        </div>
      </div>
    </div>
  );
};

export default CyberpunkTemplate;
