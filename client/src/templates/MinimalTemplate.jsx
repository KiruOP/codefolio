import { useState, useEffect } from 'react';

const MinimalTemplate = ({ data }) => {
  const { user, projects, skills } = data;
  const profile = user.profile || {};
  const { name, bio, company, location, socialLinks } = profile;
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll spy for active nav highlight
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
      const res = await fetch(`http://localhost:5000/api/portfolio/${user.username}/contact`, {
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

  const navLinkClass = (section) =>
    section === activeSection
      ? 'text-amber-700 border-b-2 border-amber-600 pb-1 font-semibold'
      : 'text-slate-600 hover:text-slate-900 transition-colors';

  return (
    <div className="bg-[#f9f9ff] text-[#141b2b] selection:bg-[#ffddb8] selection:text-[#2a1700] min-h-screen font-['Inter'] font-sans">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm bg-gradient-to-b from-slate-100/50 to-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8 h-16">
          <a href={`/${user.username}`} className="text-xl font-bold tracking-tighter text-slate-900 hover:text-[#855300] transition-colors">{name || user.username}</a>
          <div className="hidden md:flex items-center space-x-8 tracking-tight text-sm font-medium">
            <a className={navLinkClass('home')} href="#home">Home</a>
            <a className={navLinkClass('projects')} href="#projects">Projects</a>
            <a className={navLinkClass('skills')} href="#skills">Skills</a>
            <a className={navLinkClass('contact')} href="#contact">Contact</a>
          </div>
          <a href={`mailto:${user.email}`} className="bg-gradient-to-br from-[#855300] to-[#f59e0b] text-white px-5 py-2 rounded-lg font-medium text-sm shadow-lg hover:opacity-90 active:scale-95 transition-all">
            Get in Touch
          </a>
        </div>
      </nav>

      <main className="pt-16 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32" id="home">
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-[#ffddb8] text-[#2a1700] text-[10px] uppercase tracking-widest font-bold rounded-full mb-6">
                {company ? `Building at ${company}` : 'Available for Work'}
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]">
                {name ? `I'm ${name}.` : 'Hello.'} <br/>
                <span className="text-[#855300]">Crafting digital experiences</span> with precision.
              </h1>
              <p className="text-[#534434] text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl font-light">
                {bio || "Passionate full-stack developer. I build scalable applications that combine technical excellence with human-centered design."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="bg-gradient-to-br from-[#855300] to-[#f59e0b] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Contact Me
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
                <a href="#projects" className="bg-[#e1e8fd] text-[#141b2b] px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#dce2f7] transition-all flex items-center justify-center">
                  View Work
                </a>
              </div>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#f59e0b]/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1abdff]/10 rounded-full blur-[100px]"></div>
        </section>

        {/* Projects Section */}
        <section className="py-24 bg-[#f1f3ff]" id="projects">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight mb-4">Selected Works</h2>
                <p className="text-[#534434] text-lg">A curated collection of projects that define my technical journey.</p>
              </div>
              <div className="flex gap-2">
                <span className="w-12 h-1 bg-[#855300] rounded-full"></span>
                <span className="w-4 h-1 bg-[#d8c3ad] rounded-full"></span>
                <span className="w-4 h-1 bg-[#d8c3ad] rounded-full"></span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects && projects.length > 0 ? projects.map((proj, idx) => (
                <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#d8c3ad]/20">
                  <div className="aspect-video overflow-hidden bg-slate-100 flex items-center justify-center text-slate-300 relative">
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <span className="material-symbols-outlined text-6xl">code_blocks</span>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.techStack?.map((tech, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-[#ffb95f] bg-[#2a1700] px-2 py-0.5 rounded">{tech}</span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{proj.title}</h3>
                    <p className="text-[#534434] text-sm leading-relaxed mb-6">{proj.description}</p>
                    {proj.liveLink ? (
                      <a href={proj.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#855300] font-bold text-sm group-hover:gap-3 transition-all">
                        View Live Site <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                      </a>
                    ) : proj.repoLink ? (
                      <a href={proj.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#855300] font-bold text-sm group-hover:gap-3 transition-all">
                        View Source <span className="material-symbols-outlined text-sm ml-1">code</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              )) : (
                <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-300 rounded-xl">
                  No projects available yet. Check back later!
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-24" id="skills">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="sticky top-24">
                <h2 className="text-4xl font-extrabold tracking-tight mb-6">Technical Arsenal</h2>
                <p className="text-[#534434] text-lg mb-8 leading-relaxed">
                  I specialize in building modular, accessible, and performant systems. My approach is defined by the tools I use to bridge the gap between concept and code.
                </p>
                <div className="flex items-center gap-4 p-4 bg-[#e9edff] rounded-2xl border border-[#d8c3ad]/20">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#855300] to-[#f59e0b] flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">terminal</span>
                  </div>
                  <div>
                    <p className="font-bold">Core Competencies</p>
                    <p className="text-xs text-[#534434] uppercase tracking-widest">Full-Stack Architecture</p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {skills && skills.length > 0 ? skills.map((cat, idx) => (
                  <div key={idx}>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#534434] mb-4">{cat.category}</h4>
                    <div className="flex flex-wrap gap-3">
                      {cat.items?.map((item, i) => (
                        <span key={i} className="px-4 py-2 bg-white border border-[#d8c3ad]/40 rounded-lg text-sm font-medium shadow-sm hover:border-[#855300] transition-colors cursor-default">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )) : (
                  <div className="text-slate-500 italic">No specific skills listed.</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-[#f1f3ff]" id="contact">
          <div className="max-w-7xl mx-auto px-8">
            <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[2rem] shadow-xl border border-[#d8c3ad]/20 relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl font-extrabold tracking-tight mb-6">Let's build something exceptional.</h2>
                  <p className="text-[#534434] mb-8">Currently open to roles and freelance collaborations.</p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#ffddb8] flex items-center justify-center text-[#2a1700]">
                        <span className="material-symbols-outlined text-xl">mail</span>
                      </div>
                      <span className="font-medium text-[#141b2b]">{user.email}</span>
                    </div>
                    {location && (
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#ffddb8] flex items-center justify-center text-[#2a1700]">
                          <span className="material-symbols-outlined text-xl">location_on</span>
                        </div>
                        <span className="font-medium text-[#141b2b]">{location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  {status === 'success' && <div className="bg-emerald-100 text-emerald-800 p-3 rounded-xl text-sm font-bold">Message securely transmitted!</div>}
                  {status === 'err' && <div className="bg-red-100 text-red-800 p-3 rounded-xl text-sm font-bold">Failed to send message.</div>}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#534434] mb-2 ml-1">Full Name</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#e9edff] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#855300]/40 transition-all outline-none" placeholder="Jane Doe" type="text" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#534434] mb-2 ml-1">Email Address</label>
                    <input required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#e9edff] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#855300]/40 transition-all outline-none" placeholder="jane@example.com" type="email" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#534434] mb-2 ml-1">Message</label>
                    <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-[#e9edff] border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#855300]/40 transition-all outline-none resize-none" placeholder="How can I help you?" rows="4"></textarea>
                  </div>
                  <button disabled={status === 'sending'} className="w-full bg-gradient-to-br from-[#855300] to-[#f59e0b] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50" type="submit">
                    {status === 'sending' ? 'Transmitting...' : 'Send Message'}
                  </button>
                </form>
              </div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#855300]/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-xs uppercase tracking-widest text-slate-500">© {new Date().getFullYear()} {name || user.username}. Built with CodeFolio.</span>
          <div className="flex gap-8">
            {socialLinks?.github && <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-slate-400 hover:text-[#855300] hover:underline underline-offset-4 transition-all">Github</a>}
            {socialLinks?.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-slate-400 hover:text-[#855300] hover:underline underline-offset-4 transition-all">LinkedIn</a>}
            {socialLinks?.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-slate-400 hover:text-[#855300] hover:underline underline-offset-4 transition-all">Twitter</a>}
            {!socialLinks?.github && !socialLinks?.linkedin && !socialLinks?.twitter && <span className="text-xs uppercase tracking-widest text-slate-300">No socials configured</span>}
          </div>
        </div>
      </footer>

      {user.isPro && (
        <div className="fixed bottom-6 right-6 z-[100] bg-white text-[#855300] font-bold text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-[#855300]/20 shadow-[0_4px_24px_rgba(133,83,0,0.15)] rounded-full flex items-center gap-2 backdrop-blur-md">
          <span className="material-symbols-outlined text-[14px]">diamond</span> CodeFolio Pro
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
