import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const SkillForm = () => {
  const { index } = useParams(); // index of the category in the skills array
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [allSkills, setAllSkills] = useState([]); // Master array for PUTting
  
  const [categoryName, setCategoryName] = useState('');
  const [items, setItems] = useState([]);
  const [currentInput, setCurrentInput] = useState('');

  useEffect(() => {
    fetchSkills();
  }, [index]);

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('codefolio_token');
      const res = await fetch('http://localhost:5000/api/users/skills', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch skills');
      
      setAllSkills(data);
      
      if (index !== undefined) {
        const catIndex = parseInt(index);
        if (data[catIndex]) {
          setCategoryName(data[catIndex].category);
          setItems(data[catIndex].items || []);
        } else {
          setError("Category not found");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = () => {
    const trimmed = currentInput.trim();
    if (trimmed && !items.includes(trimmed)) {
      setItems([...items, trimmed]);
      setCurrentInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setItems(items.filter(s => s !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return setError("Category Name is required.");
    
    setSaving(true);
    setError(null);

    let updatedMasterSkills = [...allSkills];
    const newCategoryObj = { category: categoryName.trim(), items };

    if (index !== undefined) {
      updatedMasterSkills[parseInt(index)] = newCategoryObj;
    } else {
      updatedMasterSkills.push(newCategoryObj);
    }

    try {
      const token = localStorage.getItem('codefolio_token');
      const res = await fetch('http://localhost:5000/api/users/skills', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ skills: updatedMasterSkills })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error saving skills');

      navigate('/skills');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex-1 p-6 md:p-10 lg:p-16 max-w-4xl mx-auto w-full">
      <nav className="mb-8">
        <Link to="/skills" className="text-amber-700 font-medium text-sm flex items-center gap-2 hover:gap-3 transition-all w-fit">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to Skills
        </Link>
      </nav>

      <header className="mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-3">
          {index !== undefined ? 'Edit Category' : 'New Category'}
        </h2>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          Group your technical expertise by category to help recruiters navigate your profile.
        </p>
      </header>

      {error && <div className="bg-error-container text-on-error-container p-4 rounded-xl mb-6">{error}</div>}

      <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/15 mb-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block">Skill Category Name *</label>
            <input 
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/40 focus:bg-surface-container-lowest transition-all text-on-surface font-medium placeholder:text-slate-400" 
              placeholder="e.g., Frontend Development" 
              type="text" 
            />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block">Skills in Category</label>
            <div className="bg-surface-container-high rounded-xl p-4 min-h-[120px]">
              <div className="flex flex-wrap gap-2 mb-4">
                {items.map((skill, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-lg text-sm font-semibold border border-amber-200/50">
                    {skill}
                    <button type="button" onClick={() => handleRemoveSkill(skill)} className="material-symbols-outlined text-xs hover:text-amber-600 transition-colors flex items-center justify-center">close</button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 border border-slate-300 rounded-lg pr-1 pl-3 py-1 bg-white">
                <input 
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 p-1" 
                  placeholder="Add a skill (e.g. Next.js) and press Enter..." 
                  type="text" 
                />
                <button type="button" onClick={handleAddSkill} className="px-3 py-1.5 bg-surface-container-low rounded-md text-xs font-bold text-amber-700 shadow-sm hover:shadow-md transition-all">ADD</button>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Press Enter or click Add to append a skill tag.</p>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
            <Link to="/skills" className="px-6 py-3.5 text-on-surface-variant font-bold text-sm tracking-tight hover:bg-surface-container-high rounded-xl transition-colors">Discard</Link>
            <button type="submit" disabled={saving} className="px-8 py-3.5 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-sm tracking-tight">
              {saving ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillForm;
