/** @type {import('next').NextConfig} */

const path = require('node:path')
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  experimental: {
    ...(process.env.NODE_ENV === 'development'
      ? { outputFileTracingRoot: path.join(__dirname, '../../') }
      : null),
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    taint: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  images: {
    remotePatterns: [],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')()
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig,
  {
    org: 'vanvee',
    project: 'coinverse',
    // An auth token is required for uploading source maps.
    authToken: process.env.SENTRY_AUTH_TOKEN || '',
    telemetry: false,
    silent: false, // Can be used to suppress logs
  },
)
