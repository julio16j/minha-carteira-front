/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BRAPI_TOKEN: process.env.BRAPI_TOKEN,
        BRAPI_BASE_URL: process.env.BRAPI_BASE_URL,
        MINHA_CARTEIRA_BASE_URL: process.env.MINHA_CARTEIRA_BASE_URL
    }
}

module.exports = nextConfig
