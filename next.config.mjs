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
  }
};

export default nextConfig;



