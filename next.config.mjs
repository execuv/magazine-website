let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Removed unsupported 'runtime' key
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Fix Edge Runtime compatibility by replacing problematic modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        process: false,
        MessageChannel: false,
        BroadcastChannel: false,
      };
    }
    return config;
  },
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig

export const testConfig = {
  testTimeout: 30000, // 30 seconds
};
