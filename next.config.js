// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
}

module.exports = {
 basePath: "/main",
    async redirects() {
        return [
            {
                source: '/',
                destination: '/main',
                basePath: false,
                permanent: false, // Change to true for permanent redirect
            },
        ];
    },
}