/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        WP_ADMIN_REST_URL: process.env.WP_ADMIN_REST_URL,
        WC_PUBLIC_KEY: process.env.WC_PUBLIC_KEY,
        WC_SECRET_KEY: process.env.WC_SECRET_KEY,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'admin.limited-kicks.ru',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
