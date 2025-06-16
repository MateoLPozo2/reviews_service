/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  reactStrictMode: true,
};

export default nextConfig;
=======
  experimental: {
    serverComponentsExternalPackages: ['@neondatabase/serverless']
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
>>>>>>> 53526ed (Rename next.config.js to next.config.mjs to fix ESM error)
