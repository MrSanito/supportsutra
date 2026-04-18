/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/zod", "@repo/database"],
};

export default nextConfig;
