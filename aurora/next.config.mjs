/** @type {import('next').NextConfig} */
const staticExport = process.env.NEXT_STATIC_EXPORT === "1"

// GitHub project pages: /repo-name ; user site (username.github.io repo): leave unset or ""
const rawBase = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
const basePath = rawBase === "" || rawBase === "/" ? undefined : rawBase

const nextConfig = {
  ...(staticExport
    ? {
        output: "export",
        images: { unoptimized: true },
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
      }
    : {}),
  ...(!staticExport
    ? {
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
    : {}),
}

export default nextConfig
