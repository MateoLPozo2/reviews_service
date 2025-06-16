/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
experimental: {
  serverExternalPackages: ['@neondatabase/serverless']
},
  images: {
    domains: ['localhost'],
  },
};

export default nextConfig;
