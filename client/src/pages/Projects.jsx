import { useState, useEffect } from 'react';
import API_URL from '../config';
import { Link, useNavigate } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  // Apply search and sort whenever filters change
  useEffect(() => {
    let filtered = [...allProjects];
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.techStack?.some(t => t.toLowerCase().includes(q))
      );
    }
    if (sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === 'alpha') {
      filtered.sort((a, b) => a.title?.localeCompare(b.title));
    }
    setProjects(filtered);
  }, [search, sortOrder, allProjects]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('codefolio_token');
      const res = await fetch(`${API_URL}/api/projects`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch projects');
      setAllProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const token = localStorage.getItem('codefolio_token');
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete');
      setAllProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading projects...</div>;

  return (
    <>
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-background">Project Manager</h1>
          <p className="text-on-surface-variant max-w-xl">Curate your professional journey. Organize, showcase, and refine your projects.</p>
        </div>
        <Link to="/projects/new" className="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:translate-y-[-2px] transition-all active:translate-y-0 active:scale-95 flex items-center justify-center gap-2 w-full md:w-auto">
          <span className="material-symbols-outlined">rocket_launch</span>
          New Project
        </Link>
      </header>

      {error && <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-6">{error}</div>}

      {/* Search & Filter Bar */}
      <div className="mb-10 bg-surface-container-low p-2 rounded-2xl flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-slate-400">search</span>
          <input
            className="w-full bg-white border-none rounded-xl pl-12 pr-4 py-3.5 focus:ring-2 focus:ring-primary/20 text-on-background placeholder-slate-400 outline-none"
            placeholder="Search by name, technology, or keywords..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-white px-5 py-3.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm border-none outline-none cursor-pointer"
          >
            <option value="newest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="alpha">A → Z</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length === 0 && !loading && (
          <div className="col-span-full py-16 text-center text-slate-400">
            <span className="material-symbols-outlined text-5xl mb-3 block">search_off</span>
            {search ? `No projects match "${search}"` : 'No projects yet. Add your first one!'}
          </div>
        )}
        {projects.map(project => (
          <div key={project._id} className="group bg-surface-container-lowest border border-outline-variant/15 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
            <div className="aspect-video relative overflow-hidden bg-slate-200 shrink-0">
              <img
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">Live</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-4 leading-relaxed flex-1">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack?.slice(0, 3).map((tech, idx) => (
                  <span key={idx} className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 bg-surface-container-high rounded-lg text-secondary">{tech}</span>
                ))}
                {project.techStack?.length > 3 && (
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 bg-surface-container-high rounded-lg text-secondary">+{project.techStack.length - 3}</span>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                <div className="flex gap-2">
                  <Link to={`/projects/edit/${project._id}`} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors active:scale-90 flex items-center justify-center">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </Link>
                  <button onClick={() => handleDelete(project._id)} className="p-2 text-slate-400 hover:text-error hover:bg-error/5 rounded-lg transition-colors active:scale-90">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                    View <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}

        <Link to="/projects/new" className="border-2 border-dashed border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center p-12 hover:bg-surface-container-low hover:border-primary/50 transition-all cursor-pointer group min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-primary-container/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-3xl">add</span>
          </div>
          <span className="text-lg font-bold text-on-surface mb-2">Create New Entry</span>
          <p className="text-on-surface-variant text-sm text-center">Ready to showcase something new? Add a project to your portfolio.</p>
        </Link>
      </div>

      <div className="mt-20 pt-10 border-t border-slate-200/50 flex items-center gap-4 opacity-60">
        <span className="text-2xl font-bold text-on-background">{allProjects.length}</span>
        <span className="text-[10px] uppercase tracking-widest font-bold">Total Projects</span>
        {search && <span className="text-sm text-slate-500">· {projects.length} matching</span>}
      </div>
    </>
  );
};

export default Projects;
