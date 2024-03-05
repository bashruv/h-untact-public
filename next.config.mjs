/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hello-untact-r2.bashruv.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
