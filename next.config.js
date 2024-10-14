module.exports = {
  async redirects() {
    return [
      {
        source: '/projects/:slug*',
        destination: '/en-US/projects/:slug*',
        permanent: true,
      },
      {
        source: '/projects',
        destination: '/en-US/projects',
        permanent: true,
      },
      {
        source: '/',
        destination: '/en-US',
        permanent: true,
      },
      {
        source: '/gallery',
        destination: '/en-US/gallery',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/en-US/contact',
        permanent: true,
      },
    ]
  },
}
