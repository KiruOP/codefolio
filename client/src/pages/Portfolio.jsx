import { useState, useEffect } from 'react';
import API_URL from '../config';
import { useParams, Navigate } from 'react-router-dom';
import TemplateEngine from '../templates/TemplateEngine';
import SEO from '../components/SEO';

const Portfolio = () => {
  const { username } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`${API_URL}/api/portfolio/${username}`);
        const data = await res.json();
        
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        
        setPortfolioData(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500 font-mono">LOADING_PORTFOLIO...</div>;
  }

  // Use standard 404 page instead of custom portfolio-not-found
  if (notFound) {
    return <Navigate to="/404" replace />;
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
