const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve = webpackConfig.resolve || {};
      webpackConfig.plugins = webpackConfig.plugins || [];

      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert/"),
        util: require.resolve("util/"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
        url: require.resolve("url/"),
        zlib: require.resolve("browserify-zlib"),
        buffer: require.resolve("buffer/"),
        process: require.resolve("process/browser.js"),
      };

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser.js",
          Buffer: ["buffer", "Buffer"],
        })
      );

      return webpackConfig;
    },
  },
  devServer: (devServerConfig) => {
    devServerConfig.host = "127.0.0.1";
    devServerConfig.allowedHosts = "all";

    return devServerConfig;
  },
};
