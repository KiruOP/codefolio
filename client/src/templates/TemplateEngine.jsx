import MinimalTemplate from './MinimalTemplate';
import CyberpunkTemplate from './CyberpunkTemplate';

const templateMap = {
  minimal: MinimalTemplate,
  cyberpunk: CyberpunkTemplate
};

// Branch 12 Dynamic Template Factory
const TemplateEngine = ({ portfolioData }) => {
  // Gracefully fallback to minimal if the user's selected configuration mapping doesn't exist
  const TemplateComponent = templateMap[portfolioData.user.templateId] || MinimalTemplate;
  
  return <TemplateComponent data={portfolioData} />;
};

export default TemplateEngine;
