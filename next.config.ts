import type { NextConfig } from "next";

// Cloudflare Workers の静的アセットとして配信するためHTMLを書き出す
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
