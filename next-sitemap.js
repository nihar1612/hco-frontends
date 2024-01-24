module.exports = {
  siteUrl: 'https://www.dawn.health',
  exclude: [
    '/experimental/*',
    '/account/*',
    '/checkout*',
    '/questionnaire*',
    '/cbti-sleep-better*',
    '/email-submitted',
    '/unsupported-state',
  ],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/experimental/',
      },
    ],
  },
};
