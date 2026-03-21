import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const ProfileSettings = () => {
  const { user } = useOutletContext();
  
  // Local state for the form inputs
  const [formData, setFormData] = useState({
    fullName: user?.profile?.name || user?.username || 'Alex Rivero',
    email: user?.email || 'alex.rivero@dev.io',
    location: user?.profile?.location || 'San Francisco, CA',
    bio: user?.profile?.bio || 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Coffee lover and open-source contributor.',
    github: user?.profile?.socialLinks?.github || 'github.com/arivero',
    linkedin: user?.profile?.socialLinks?.linkedin || 'linkedin.com/in/alexrivero',
    website: user?.profile?.socialLinks?.website || 'arivero.dev',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      const token = localStorage.getItem('codefolio_token');
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');
      
      setSuccessMessage('Profile updated successfully!');
      
      // Update local storage context
      const userDataStr = localStorage.getItem('codefolio_user');
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        userData.user = data;
        localStorage.setItem('codefolio_user', JSON.stringify(userData));
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-2">Profile Settings</h1>
        <p className="text-on-surface-variant">Update your professional identity and public appearance.</p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-600 rounded-xl">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-error-container border border-error/10 text-on-error-container rounded-xl">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Header Card */}
        <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-surface-container-high border-2 border-primary/10">
                <img 
                  alt="Profile avatar large" 
                  className="w-full h-full object-cover" 
                  src={user?.profile?.avatarUrl || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} 
                />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg border-2 border-surface-container-lowest hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 0" }}>edit</span>
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-1">
              <h3 className="text-2xl font-bold text-on-surface">{formData.fullName}</h3>
              <p className="text-amber-700 font-medium">Full-stack Engineer</p>
              <p className="text-sm text-on-surface-variant max-w-sm">Member since October 2023. Based in {formData.location}.</p>
              
              <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-3 py-1 bg-surface-container-low text-xs font-label uppercase tracking-widest text-on-surface-variant rounded-lg">PRO MEMBER</span>
                <span className="px-3 py-1 bg-surface-container-low text-xs font-label uppercase tracking-widest text-on-surface-variant rounded-lg">AVAILABLE FOR HIRE</span>
              </div>
            </div>
          </div>
        </section>

        {/* Two Column Layout for Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Personal Info Section */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-amber-700" style={{ fontVariationSettings: "'FILL' 0" }}>account_circle</span>
              <h2 className="text-lg font-bold text-on-surface">Personal Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-on-surface-variant mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName} 
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface placeholder-slate-400" 
                />
              </div>
              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-on-surface-variant mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface placeholder-slate-400" 
                />
              </div>
              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-on-surface-variant mb-2">Location</label>
                <input 
                  type="text" 
                  name="location"
                  value={formData.location} 
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface placeholder-slate-400" 
                />
              </div>
              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-on-surface-variant mb-2">Bio</label>
                <textarea 
                  rows="4"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface placeholder-slate-400 resize-none" 
                ></textarea>
              </div>
            </div>
          </section>

          {/* Social & Resume Section */}
          <div className="space-y-8">
            
            {/* Social Connections Section */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-amber-700" style={{ fontVariationSettings: "'FILL' 0" }}>share</span>
                <h2 className="text-lg font-bold text-on-surface">Social Connections</h2>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-400 text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>link</span>
                  <input 
                    type="text" 
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface" 
                    placeholder="GitHub URL" 
                  />
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-400 text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>work</span>
                  <input 
                    type="text" 
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface" 
                    placeholder="LinkedIn URL" 
                  />
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-400 text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>language</span>
                  <input 
                    type="text" 
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface" 
                    placeholder="Personal Website" 
                  />
                </div>
              </div>
            </section>

            {/* Resume/CV Section */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-amber-700" style={{ fontVariationSettings: "'FILL' 0" }}>description</span>
                <h2 className="text-lg font-bold text-on-surface">Resume / CV</h2>
              </div>
              <div className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 text-center hover:bg-surface-container-low transition-colors group cursor-pointer">
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-amber-700" style={{ fontVariationSettings: "'FILL' 0" }}>upload_file</span>
                </div>
                <p className="text-sm font-semibold text-on-surface">Click to upload your CV</p>
                <p className="text-xs text-on-surface-variant mt-1">PDF or DOCX (Max. 5MB)</p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-600" style={{ fontVariationSettings: "'FILL' 0" }}>article</span>
                  <div>
                    <p className="text-xs font-bold text-on-surface">alex_rivero_cv_2024.pdf</p>
                    <p className="text-[10px] text-on-surface-variant">Uploaded 2 days ago</p>
                  </div>
                </div>
                <button className="text-error hover:bg-error-container/20 p-1.5 rounded-lg transition-colors">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>delete</span>
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 pb-12">
          <button className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-colors rounded-xl">
            Cancel
          </button>
          <button onClick={handleSave} className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-br from-primary to-primary-container text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-900/10 hover:opacity-90 active:scale-95 transition-all">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
