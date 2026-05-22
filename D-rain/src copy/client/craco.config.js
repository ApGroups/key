const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ensure resolve and plugins objects exist
      webpackConfig.resolve = webpackConfig.resolve || {};
      webpackConfig.plugins = webpackConfig.plugins || [];

      // Set up fallbacks for Node.js core modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert/"),
        "util": require.resolve("util/"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "url": require.resolve("url/")
      };

      // Provide global variables for process and Buffer
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"]
        })
      );

      // Ignore source map warnings for specific WalletConnect modules
      webpackConfig.ignoreWarnings = [
        { module: /@walletconnect\/environment/ },
        { module: /@walletconnect\/http-connection/ },
        { module: /@walletconnect\/iso-crypto/ },
        { module: /@walletconnect\/jsonrpc-utils/ },
        { module: /@walletconnect\/randombytes/ },
        { module: /@walletconnect\/safe-json/ },
        { module: /@walletconnect\/socket-transport/ },
        { module: /@walletconnect\/utils/ },
        { module: /@walletconnect\/web3-provider/ },
        { module: /@walletconnect\/window-getters/ },
        { module: /@walletconnect\/window-metadata/ }
        // Add additional modules as needed...
      ];

      return webpackConfig;
    },
  },
};
