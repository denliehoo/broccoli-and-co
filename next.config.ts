import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/:path*', // Match all paths
  //       destination: '/', // Redirect to the root path
  //       permanent: true, // Use a 308 permanent redirect
  //     },
  //   ];
  // },
};

export default nextConfig;
