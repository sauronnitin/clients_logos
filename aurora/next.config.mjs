/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/embed/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://framer.com https://app.framer.com https://*.framer.website https://*.framer.app;",
          },
        ],
      },
    ]
  },
}

export default nextConfig
