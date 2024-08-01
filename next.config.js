/** @type {import('next').NextConfig} */
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/rawg/:path*',
          destination: 'https://api.rawg.io/api/:path*', // La URL de la API
        },
      ]
    },
  }
  
  
