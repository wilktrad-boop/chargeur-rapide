/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Gérer les modules ESM correctement
  experimental: {
    esmExternals: true,
  },
  // Transpiler les packages ESM problématiques
  transpilePackages: [
    'next-mdx-remote',
  ],
};

export default nextConfig;



