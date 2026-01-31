
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler: true, // Commenting out as it might not be standard in types yet
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        os: false,
        path: false,
        child_process: false,
        crypto: false,
      };
    }

    // Enable WebAssembly support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    return config;
  },
};

export default nextConfig;
