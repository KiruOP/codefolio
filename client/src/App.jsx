import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Eager load core app shell to prevent layout shift
import DashboardLayout from './templates/DashboardLayout';

// Lazy load feature routes (Branch 20: Performance Optimization)
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const ProfileSettings = React.lazy(() => import('./pages/ProfileSettings'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ProjectForm = React.lazy(() => import('./pages/ProjectForm'));
const Skills = React.lazy(() => import('./pages/Skills'));
const SkillForm = React.lazy(() => import('./pages/SkillForm'));
const TemplateSelector = React.lazy(() => import('./pages/TemplateSelector'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#f9f9ff]"><div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Dashboard Routes */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/new" element={<ProjectForm />} />
              <Route path="/projects/edit/:id" element={<ProjectForm />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/skills/new" element={<SkillForm />} />
              <Route path="/skills/edit/:index" element={<SkillForm />} />
              <Route path="/templates" element={<TemplateSelector />} />
            </Route>

            {/* Public Portfolio Route */}
            <Route path="/:username" element={<Portfolio />} />

            {/* Explicit 404 Route (for Navigate to="/404") */}
            <Route path="/404" element={<NotFound />} />

            {/* 404 Catch-All Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
