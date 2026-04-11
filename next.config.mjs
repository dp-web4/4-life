/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/a-day-in-web4',
        destination: '/day-in-web4',
        permanent: true,
      },
      {
        source: '/mrh',
        destination: '/markov-relevancy-horizon',
        permanent: true,
      },
      {
        source: '/trust-neighborhood',
        destination: '/markov-relevancy-horizon',
        permanent: true,
      },
      {
        source: '/ai-identity',
        destination: '/understanding-consciousness',
        permanent: true,
      },
      {
        source: '/ai-trust-limits',
        destination: '/capacity-thresholds',
        permanent: true,
      },
      {
        source: '/ai-learning',
        destination: '/exploration-not-evaluation',
        permanent: true,
      },
      {
        source: '/learning-journey',
        destination: '/learn',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    return config;
  },
};

export default nextConfig;
