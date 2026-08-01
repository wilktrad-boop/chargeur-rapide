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
  // Gérer les modules ESM correctement
  experimental: {
    esmExternals: true,
  },
  // Transpiler les packages ESM problématiques
  transpilePackages: [
    'next-mdx-remote',
  ],
  async redirects() {
    const junk = [
      '/energie/compteur-edf-plomb',
      '/energie/compteur-texte-egc-vendee',
      '/energie/unite-technique-operationnelle-edf',
      '/energie/veol-edf-intranet',
      '/chargeurs/epershand-net-chargeurs-promotion',
      '/mobilite/co-valence-fr-mobilite-electrique',
      '/mobilite/trackr-fr-tech-localisation',
      '/guides/sabradou-trouver-chargeurs',
      '/entreprise/corexiapro-fr',
      '/entreprise/nexterprise-fr',
      '/entreprise/zone-business-fr',
    ];
    return junk.map((source) => ({ source, destination: '/', permanent: true }));
  },
};

export default nextConfig;



