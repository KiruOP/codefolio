import { useState, useEffect } from 'react';
import API_URL from '../config';
import { Link } from 'react-router-dom';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('codefolio_token');
      const res = await fetch(`${API_URL}/api/users/skills`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch skills');
      setSkills(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (indexToDelete) => {
    if (!window.confirm('Delete this entire category?')) return;
    try {
      const token = localStorage.getItem('codefolio_token');
      const newSkills = skills.filter((_, idx) => idx !== indexToDelete);
      
      const res = await fetch(`${API_URL}/api/users/skills`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ skills: newSkills })
      });

      if (!res.ok) throw new Error('Failed to delete category');
      setSkills(newSkills);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading skills...</div>;

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto w-full flex-1">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-on-surface">Skills Manager</h1>
          <p className="text-on-surface-variant max-w-xl">Organize and curate your technical expertise. These skills will be featured across your portfolio projects and resume exports.</p>
        </div>
        <Link to="/skills/new" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95">
          <span className="material-symbols-outlined">category</span>
          Add New Category
        </Link>
      </div>

      {error && <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-6">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
        {skills.map((categoryGroup, index) => (
          <section key={index} className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 border border-outline-variant/15 flex flex-col h-full">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 shrink-0">
                  <span className="material-symbols-outlined">psychology</span>
                </div>
                <h2 className="text-xl font-bold text-on-surface leading-tight">{categoryGroup.category}</h2>
              </div>
              <div className="flex gap-1">
                <Link to={`/skills/edit/${index}`} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-full transition-colors active:scale-95 flex items-center justify-center" title="Edit Category">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </Link>
                <button onClick={() => handleDeleteCategory(index)} className="p-2 text-slate-400 hover:text-error hover:bg-error/5 rounded-full transition-colors active:scale-95 flex items-center justify-center" title="Delete Category">
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-auto">
              {categoryGroup.items?.map((skill, sIdx) => (
                <div key={sIdx} className="px-4 py-2 bg-primary-fixed text-on-primary-fixed-variant rounded-lg text-sm font-semibold">
                  {skill}
                </div>
              ))}
              {(!categoryGroup.items || categoryGroup.items.length === 0) && (
                <div className="text-sm text-slate-400 italic">No skills added yet.</div>
              )}
            </div>
          </section>
        ))}

        {skills.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-outline-variant/30 rounded-2xl">
            <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">stars</span>
            <h3 className="text-xl font-bold text-on-surface mb-2">No Skills Categories Found</h3>
            <p className="text-on-surface-variant max-w-sm mx-auto mb-6">Start building your competency matrix by adding a skill category like "Frontend" or "Database".</p>
            <Link to="/skills/new" className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary/20 transition-all">
              <span className="material-symbols-outlined">add</span> Create First Category
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
