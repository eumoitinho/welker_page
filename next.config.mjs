/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE,
    },
    // Add any other Next.js config options here
  }
  
  // ES Modules export
  export default nextConfig
