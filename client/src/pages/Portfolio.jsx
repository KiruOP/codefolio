import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import TemplateEngine from '../templates/TemplateEngine';
import SEO from '../components/SEO';

const Portfolio = () => {
  const { username } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/portfolio/${username}`);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || 'Portfolio not found');
        }
        
        setPortfolioData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500 font-mono">LOADING_PORTFOLIO...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">sentiment_dissatisfied</span>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Portfolio Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md text-center">
          We couldn't locate a CodeFolio under the username <strong>@{username}</strong>. 
          The user might have changed their handle or deleted their account.
        </p>
        <Link to="/" className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-[0_8px_16px_-4px_rgba(133,83,0,0.3)] hover:scale-105 transition-all">
          Return to CodeFolio
        </Link>
      </div>
    );
  }

  const profile = portfolioData?.user?.profile || {};

  return (
    <>
      <SEO 
        title={profile.name || portfolioData.user.username} 
        description={profile.bio} 
        name={profile.name} 
      />
      <TemplateEngine portfolioData={portfolioData} />
    </>
  );
};

export default Portfolio;
