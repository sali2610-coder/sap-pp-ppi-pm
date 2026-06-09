import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 100% offline static export — produces an `out/` folder servable by any
  // internal web server with no Node.js runtime (firewall-safe for CBC).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
