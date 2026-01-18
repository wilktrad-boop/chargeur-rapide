/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp']
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr'
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



