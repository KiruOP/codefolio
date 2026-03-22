import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';

const MAX_FILE_SIZE = 100 * 1024; // 100 KB

const ProfileSettings = () => {
  const { user, setUser } = useOutletContext();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    bio: '',
    github: '',
    linkedin: '',
    website: '',
    avatar: '',        // base64 dataURL
    resumeData: '',    // base64 string
    resumeName: '',    // original filename
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [resumeFileError, setResumeFileError] = useState('');
  const [avatarFileError, setAvatarFileError] = useState('');

  const avatarInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  // Fetch profile data from API on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('codefolio_token');
        const res = await fetch('http://localhost:5000/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setFormData({
          fullName: data.profile?.name || data.username || '',
          email: data.email || '',
          location: data.profile?.location || '',
          bio: data.profile?.bio || '',
          github: data.profile?.socialLinks?.github || '',
          linkedin: data.profile?.socialLinks?.linkedin || '',
          website: data.profile?.socialLinks?.website || '',
          avatar: data.profile?.avatar || '',
          resumeData: data.profile?.resumeData || '',
          resumeName: data.profile?.resumeName || '',
        });
        if (data.profile?.avatar) setAvatarPreview(data.profile.avatar);
      } catch (err) {
        setErrorMessage('Failed to load profile: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle avatar image upload — convert to base64
  const handleAvatarChange = (e) => {
    setAvatarFileError('');
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setAvatarFileError(`Image too large (${(file.size / 1024).toFixed(1)} KB). Max is 100 KB.`);
      return;
    }
    if (!file.type.startsWith('image/')) {
      setAvatarFileError('Please upload an image file (JPG, PNG, WebP, etc.)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setFormData(prev => ({ ...prev, avatar: base64 }));
      setAvatarPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  // Handle resume PDF upload — convert to base64
  const handleResumeChange = (e) => {
    setResumeFileError('');
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setResumeFileError(`PDF too large (${(file.size / 1024).toFixed(1)} KB). Max is 100 KB.`);
      return;
    }
    if (file.type !== 'application/pdf') {
      setResumeFileError('Only PDF files are allowed.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData(prev => ({
        ...prev,
        resumeData: ev.target.result,
        resumeName: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
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
      
      // Update localStorage and layout context
      const userDataStr = localStorage.getItem('codefolio_user');
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        userData.user = data;
        localStorage.setItem('codefolio_user', JSON.stringify(userData));
        if (setUser) setUser(data);
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const removeResume = () => {
    setFormData(prev => ({ ...prev, resumeData: '', resumeName: '' }));
    if (resumeInputRef.current) resumeInputRef.current.value = '';
  };

  const removeAvatar = () => {
    setAvatarPreview('');
    setFormData(prev => ({ ...prev, avatar: '' }));
    if (avatarInputRef.current) avatarInputRef.current.value = '';
  };

  if (loading) return <div className="p-10 text-center text-slate-500">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-2">Profile Settings</h1>
        <p className="text-on-surface-variant">Update your professional identity and public appearance.</p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-600 rounded-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Header Card — Avatar Upload */}
        <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Avatar */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group">
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-surface-container-high border-2 border-primary/10 flex items-center justify-center">
                  {avatarPreview ? (
                    <img alt="Profile avatar" className="w-full h-full object-cover" src={avatarPreview} />
                  ) : (
                    <span className="material-symbols-outlined text-5xl text-slate-300">person</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg border-2 border-surface-container-lowest hover:bg-primary-container transition-colors"
                  title="Upload photo"
                >
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                </button>
              </div>
              <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              <p className="text-[10px] uppercase tracking-widest text-slate-400 text-center">Max 100 KB<br />JPG, PNG, WebP</p>
              {avatarPreview && (
                <button type="button" onClick={removeAvatar} className="text-xs text-red-500 hover:underline">Remove photo</button>
              )}
              {avatarFileError && <p className="text-xs text-red-500 text-center max-w-[140px]">{avatarFileError}</p>}
            </div>

            <div className="flex-1 text-center md:text-left space-y-1">
              <h3 className="text-2xl font-bold text-on-surface">{formData.fullName || formData.email || 'Your Name'}</h3>
              {formData.location && <p className="text-slate-500 text-sm">{formData.location}</p>}
              {formData.bio && <p className="text-sm text-on-surface-variant max-w-sm mt-2">{formData.bio}</p>}
              
              <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-2">
                {user?.isPro && (
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-label uppercase tracking-widest rounded-lg border border-amber-200">PRO MEMBER</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Personal Info Section */}
          <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-amber-700">account_circle</span>
              <h2 className="text-lg font-bold text-on-surface">Personal Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-on-surface-variant mb-2">Full Name</label>
                <input 
                  type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface outline-none"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-on-surface-variant mb-2">Email Address</label>
                <input 
                  type="email" name="email" value={formData.email} onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface outline-none"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-on-surface-variant mb-2">Location</label>
                <input 
                  type="text" name="location" value={formData.location} onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface outline-none"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-xs font-label uppercase tracking-wider text-on-surface-variant mb-2">Bio</label>
                <textarea 
                  rows="4" name="bio" value={formData.bio} onChange={handleChange}
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface outline-none resize-none"
                  placeholder="Tell recruiters and visitors about yourself..."
                />
              </div>
            </div>
          </section>

          {/* Social & Resume Section */}
          <div className="space-y-8">
            
            {/* Social Links */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-amber-700">share</span>
                <h2 className="text-lg font-bold text-on-surface">Social Connections</h2>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-400 text-lg">link</span>
                  <input 
                    type="text" name="github" value={formData.github} onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface outline-none"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-400 text-lg">work</span>
                  <input 
                    type="text" name="linkedin" value={formData.linkedin} onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface outline-none"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-3.5 text-slate-400 text-lg">language</span>
                  <input 
                    type="text" name="website" value={formData.website} onChange={handleChange}
                    className="w-full bg-surface-container-low border-none rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-primary/40 text-on-surface outline-none"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </section>

            {/* Resume Upload */}
            <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-amber-700">description</span>
                <h2 className="text-lg font-bold text-on-surface">Resume / CV</h2>
              </div>

              {/* Upload Drop Zone */}
              <div
                onClick={() => resumeInputRef.current?.click()}
                className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 text-center hover:bg-surface-container-low transition-colors group cursor-pointer"
              >
                <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-amber-700">upload_file</span>
                </div>
                <p className="text-sm font-semibold text-on-surface">Click to upload your CV</p>
                <p className="text-xs text-on-surface-variant mt-1">PDF only · Max 100 KB</p>
              </div>
              <input ref={resumeInputRef} type="file" accept="application/pdf" className="hidden" onChange={handleResumeChange} />

              {resumeFileError && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {resumeFileError}
                </p>
              )}

              {/* Uploaded File Preview */}
              {formData.resumeName && (
                <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-amber-600">article</span>
                    <div>
                      <p className="text-xs font-bold text-on-surface truncate max-w-[160px]">{formData.resumeName}</p>
                      <p className="text-[10px] text-on-surface-variant">Saved to profile</p>
                    </div>
                  </div>
                  <button onClick={removeResume} className="text-error hover:bg-error-container/20 p-1.5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4 pb-12">
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-colors rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-br from-primary to-primary-container text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-900/10 hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
