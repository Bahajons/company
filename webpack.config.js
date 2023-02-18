// webpack.config.js

module.exports = {
  // other config options...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              throwIfNamespace: false, // Add this line
              svgoConfig: {
                plugins: [
                  { removeViewBox: false },
                  { cleanupIDs: true },
                  { throwIfNamespace: false } // Add this line
                ],
              },
            },
          },
          // other loaders for SVG files...
        ],
      },
      // other rules for other file types...
    ],
  },
  // other config options...
};
