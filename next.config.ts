import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 100% offline static export — produces an `out/` folder servable by any
  // internal web server with no Node.js runtime (firewall-safe).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Strip the "X-Powered-By: Next.js" fingerprint (info-leak) — corporate posture.
  poweredByHeader: false,
};

export default nextConfig;
