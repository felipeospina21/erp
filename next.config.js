module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/felipeospina21/**',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};
