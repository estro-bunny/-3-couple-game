/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: {
      exclude: ["error", "warn"],
    },
  },
};

module.exports = nextConfig;
