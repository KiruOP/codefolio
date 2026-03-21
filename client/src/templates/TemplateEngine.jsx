import React, { Suspense } from 'react';

// Branch 20: Performance Optimization via Lazy Loading templates
const MinimalTemplate = React.lazy(() => import('./MinimalTemplate'));
const CyberpunkTemplate = React.lazy(() => import('./CyberpunkTemplate'));

const templateMap = {
  minimal: MinimalTemplate,
  cyberpunk: CyberpunkTemplate
};

// Branch 12 Dynamic Template Factory
const TemplateEngine = ({ portfolioData }) => {
  // Gracefully fallback to minimal if the user's selected configuration mapping doesn't exist
  const TemplateComponent = templateMap[portfolioData.user.templateId] || MinimalTemplate;
  
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#f9f9ff] flex items-center justify-center font-mono opacity-50 z-[9999] absolute inset-0">Loading Workspace Assets...</div>}>
      <TemplateComponent data={portfolioData} />
    </Suspense>
  );
};

export default TemplateEngine;
