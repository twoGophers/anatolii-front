export const baseUrl = 
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? process.env.NEXT_PUBLIC_BASE_DEVELOPER_URL || 'http://localhost:3001'
    : process.env.NEXT_PUBLIC_SERVER_URL || 'https://sunyard.md/';
