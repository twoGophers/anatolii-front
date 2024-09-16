/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3001',
                pathname: '/image/**',
            },
            {
                protocol: 'https',
                hostname: 'anatolii-back.onrender.com',
                pathname: '/image/**',
            },
        ],
    },
};

export default nextConfig;
