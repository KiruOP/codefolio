import { useState, useEffect } from 'react';
import API_URL from '../config';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    repoLink: '',
    liveLink: '',
    image: ''
  });

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem('codefolio_token');
      const res = await fetch(`${API_URL}/api/projects`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to fetch project');
      
      const project = data.find(p => p._id === id);
      if (project) {
        setFormData({
          title: project.title,
          description: project.description || '',
          techStack: project.techStack ? project.techStack.join(', ') : '',
          repoLink: project.repoLink || '',
          liveLink: project.liveLink || '',
          image: project.image || ''
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem('codefolio_token');
      const url = id ? `${API_URL}/api/projects/${id}` : `${API_URL}/api/projects`;
      const method = id ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean)
      };

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error saving project');

      navigate('/projects');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading project details...</div>;

  return (
    <form onSubmit={handleSubmit} className="pb-24 md:pb-0">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-3">
            <Link to="/projects" className="hover:text-primary">Projects</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-primary">{id ? 'Edit Project' : 'New Project'}</span>
          </nav>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-background">{id ? 'Edit Project' : 'New Project'}</h1>
          <p className="text-on-surface-variant mt-2 max-w-lg">Refine your project narrative, showcase your tech stack, and prepare your masterpiece for the global gallery.</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/projects')} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-on-surface-variant bg-surface-container-high hover:bg-surface-container-highest transition-colors">Discard</button>
          <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-br from-primary to-primary-container shadow-lg shadow-amber-900/10 active:scale-95 transition-all">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </header>

      {error && <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-6">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/15">
            <h3 className="text-lg font-bold text-on-background mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">info</span> General Information
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Project Title *</label>
                <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary-container transition-all" placeholder="Enter a descriptive title" type="text" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary-container transition-all resize-none" placeholder="Explain the problem you solved and the impact of this project..." rows="6"></textarea>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/15">
            <h3 className="text-lg font-bold text-on-background mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">terminal</span> Tech Stack
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Technologies (Comma separated)</label>
                <input name="techStack" value={formData.techStack} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary-container transition-all" placeholder="React, Node.js, MongoDB, Tailwind..." type="text" />
                <p className="text-xs text-on-surface-variant italic mt-2">Example: React.js, Tailwind CSS, TypeScript</p>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/15">
            <h3 className="text-lg font-bold text-on-background mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">link</span> Project Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">Live Demo URL</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">public</span>
                  <input name="liveLink" value={formData.liveLink} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-11 pr-4 text-on-surface focus:ring-2 focus:ring-primary-container transition-all" type="url" placeholder="https://..." />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">GitHub Repository</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">code</span>
                  <input name="repoLink" value={formData.repoLink} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-11 pr-4 text-on-surface focus:ring-2 focus:ring-primary-container transition-all" type="url" placeholder="https://github.com/..." />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/15">
            <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">Cover Image URL</h3>
            <div className="mb-4">
              <input name="image" value={formData.image} onChange={handleChange} className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 text-on-surface focus:ring-2 focus:ring-primary-container transition-all text-sm" placeholder="https://image-url..." type="url" />
            </div>
            {formData.image && (
              <div className="relative aspect-video rounded-xl bg-surface-container-low border border-outline-variant/30 overflow-hidden">
                <img src={formData.image} alt="Cover Preview" className="w-full h-full object-cover" />
              </div>
            )}
            {!formData.image && (
              <div className="relative aspect-video rounded-xl bg-surface-container-low border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center p-4">
                <span className="material-symbols-outlined text-4xl text-primary/30 mb-2">image</span>
                <p className="text-xs font-semibold text-on-surface-variant mb-1">No image provided</p>
              </div>
            )}
            <p className="text-[10px] mt-3 text-on-surface-variant leading-relaxed">Provide a direct URL to a high-res image representing your project.</p>
          </section>
          
          <div className="bg-gradient-to-br from-inverse-surface to-slate-800 rounded-2xl p-6 text-white shadow-xl shadow-slate-900/10">
            <span className="material-symbols-outlined text-amber-400 text-3xl mb-4">auto_awesome</span>
            <h4 className="text-lg font-bold mb-2">Ready to publish?</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">Complete all required fields to showcase this project to the world.</p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
