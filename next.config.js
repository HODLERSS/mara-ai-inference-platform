/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  compiler: {
    emotion: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig