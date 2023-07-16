/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    API_KEY: "AIzaSyDaISfmA1Lqyv6Qv5lDQyhymQ7UwIQeDM4",
    AUTH_DOMAIN: "learning-e8305.firebaseapp.com",
    PROJECT_ID: "learning-e8305",
    STORAGE_BUCKET: "learning-e8305.appspot.com",
    MESSAGING_SENDER_ID: "373480467294",
    APP_ID: "1:373480467294:web:7d829f5da36e7235d0bdcf",
  },
};

module.exports = nextConfig;
