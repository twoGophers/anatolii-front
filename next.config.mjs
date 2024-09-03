/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3001', // specify the port if different from 80 or 443
                pathname: '/image/**',
            },
        ],
    },
};

export default nextConfig;
