/**
 * CodeFolio Configuration
 * Centralized API and environment variables
 */

// Deployment Tip: When using Vite, environment variables must start with VITE_
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default API_URL;
