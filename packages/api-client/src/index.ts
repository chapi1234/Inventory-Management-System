// A simple fetch wrapper that will eventually connect to apps/api
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  get: async (endpoint: string) => {
    // const res = await fetch(\`\${API_BASE_URL}\${endpoint}\`);
    // return res.json();
    console.log(\`Mock GET to \${endpoint}\`);
    return { data: null };
  },
  post: async (endpoint: string, data: any) => {
    console.log(\`Mock POST to \${endpoint}\`, data);
    return { data };
  }
};
