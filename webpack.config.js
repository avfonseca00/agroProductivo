    // webpack.config.js
    module.exports = {
        // ...
        module: {
          rules: [
            {
              test: /\.svg$/,
              use: [
                {
                  loader: '@svgr/webpack',
                  options: {
                    svgoConfig: {
                      plugins: [{ removeViewBox: false }],
                    },
                    throwIfNamespace: false, // Agrega esta línea
                  },
                },
                'url-loader',
              ],
            },
            // ...
          ],
        },
        // ...
      };