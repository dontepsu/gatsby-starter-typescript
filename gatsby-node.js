const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

exports.onCreateWebpackConfig = ({
  stage,
  loaders,
  actions,
}) => {
  actions.setWebpackConfig({
    devtool: 'source-map',
    resolve: {
      modules: [path.resolve(__dirname, `src`), `node_modules`],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          // use: [loaders.js(), require.resolve('ts-loader')]
          loader: require.resolve('ts-loader'),

        },
        {
          test: /\.tsx?$/,
          enforce: `pre`,
          exclude: /(node_modules|cache|public)/,
          use: [
            {
              loader: require.resolve(`tslint-loader`),
              options: { emitErrors: stage === `build-javascript` }
            }
          ]
        },
      ]
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()]
    }
  })
};

exports.resolvableExtensions = () => ['.ts', '.tsx', '.js', '.jsx'];
