import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  // https://nextjs.org/docs/architecture/nextjs-compiler#styled-components
  compiler: { styledComponents: true },
};

export default nextConfig;
