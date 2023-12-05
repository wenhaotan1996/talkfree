/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
    ],
  },
  basePath: '/talkfree',
  output: 'standalone',
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost', 'www.wenhaotan.cloud'],
    },
  },
};

module.exports = nextConfig;
