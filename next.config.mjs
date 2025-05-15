/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

const withAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

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
            {
                protocol: 'https',
                hostname: 'limited-kicks.ru',
                pathname: '**',
            },
        ],
    },
};

export default withAnalyzer(nextConfig);