/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/zod", "@repo/database"],
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
