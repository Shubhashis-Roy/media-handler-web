import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'github.com'],
  },
  transpilePackages: ['lucide-react'],
};

export default nextConfig;
