/** @type {import('next').NextConfig} */

const nextConfig = {
    env: {
        PUBLIC_API_URL: 'https://gai.co.id/gai-ai-service/v1',
        BASE_API_URL: 'http://localhost:3000/api'
    },
    reactStrictMode: false,
    compress: true,
    // eslint: {
    //     ignoreDuringBuilds: true
    // },
    trailingSlash: false,
    // typescript: {
    //     ignoreBuildErrors: true
    // },
    // experimental: {
    //     missingSuspenseWithCSRBailout: false,
    // },
    images: {
        // loader: 'custom',
        // loaderFile: './loader.js',
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'merakiui.com',
                port: ''
            }
        ]
    }
};

export default nextConfig;
