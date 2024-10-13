/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cross-Origin-Embedder-Policy',
              value: 'require-corp',  // Required for using SharedArrayBuffer
            },
            {
              key: 'Cross-Origin-Opener-Policy',
              value: 'same-origin',  // Required for security isolation
            },
            {
              key: 'Accept-Ranges',
              value: 'bytes',  // Enable partial content delivery
            },
            {
              key: 'Access-Control-Allow-Origin',
              value: '*',  // Allow requests from any origin
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET, POST, OPTIONS',  // Allow necessary HTTP methods
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'Range',  // Explicitly allow the Range header
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  