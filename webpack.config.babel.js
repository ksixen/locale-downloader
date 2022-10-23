const path = require("path");
import HtmlWebpackPlugin from "html-webpack-plugin";
const webpack = require("webpack");
const scriptFiles = /\.(js|jsx)?$/;
export default () => {
  return {
    entry: "./src/index.jsx",
    amd: false,
    cache: true,
    mode: "development",
    devtool: "source-map",
    target: "web",
    resolve: {
      fallback: {
        fs: false,
        https: false,
      },
    },
    performance: {
      assetFilter: (assetFilename) =>
        new RegExp(scriptFiles, "").test(assetFilename),
      hints: "warning",
      maxAssetSize: 2000000,
      maxEntrypointSize: 2000000,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          options: { presets: ['@babel/env', '@babel/preset-react'] },
        },
      ],
    },
    output: {
      filename: "[name].[contenthash].js",
      clean: true,
      path: path.join(__dirname, "/dist/static"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
      new webpack.DefinePlugin({
        process: { env: {} },
      }),
    ],
    optimization: {
      runtimeChunk: "multiple",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "async",
          },
        },
      },
    },
  };
};
