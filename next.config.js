const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  swcMinify: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/blog/psychophysiological-insomnia-explained',
        destination: '/blog/what-is-psychophysiological-insomnia',
        permanent: true,
      },
      {
        source: '/blog/a-chronic-poor-sleepers-journey-to-better-sleep',
        destination: '/blog/guide-to-better-sleep',
        permanent: true,
      },
      {
        source: '/blog/basic-sleep-hygiene',
        destination: '/blog/5-tips-for-better-sleep-hygiene-and-wellness',
        permanent: true,
      },
      {
        source: '/calendly',
        destination: 'https://calendly.com/dawn-health/dawn-onboarding-call',
        permanent: false,
      },
    ];
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
