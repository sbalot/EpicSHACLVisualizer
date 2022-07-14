const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");

// absolute paths to all symlinked modules inside `nodeModulesPath`
// adapted from https://github.com/webpack/webpack/issues/811#issuecomment-405199263
const findLinkedModules = (nodeModulesPath) => {
  const modules = [];

  fs.readdirSync(nodeModulesPath).forEach((dirname) => {
    const modulePath = path.resolve(nodeModulesPath, dirname);
    const stat = fs.lstatSync(modulePath);

    if (dirname.startsWith(".")) {
      // not a module or scope, ignore
    } else if (dirname.startsWith("@")) {
      // scoped modules
      modules.push(...findLinkedModules(modulePath));
    } else if (stat.isSymbolicLink()) {
      const realPath = fs.realpathSync(modulePath);
      const realModulePath = path.resolve(realPath, "node_modules");

      modules.push(realModulePath);
    }
  });

  return modules;
};

module.exports = {
  entry: path.resolve(__dirname, "../src/index.js"),

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    symlinks: false,
    modules: [
      "node_modules",
      // 'app',
      // provide absolute path to the main node_modules,
      // to avoid webpack searching around and getting confused
      // see https://webpack.js.org/configuration/resolve/#resolve-modules
      // path.resolve('node_modules'),
      // include linked node_modules as fallback, in case the deps haven't
      // yet propagated to the main node_modules
      // ...findLinkedModules(path.resolve('node_modules')),
    ],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      buffer: require.resolve("buffer/"),
      process: require.resolve("process/browser"),
      os: require.resolve("os-browserify/browser"),
      assert: require.resolve("assert/"),
      zlib: require.resolve("browserify-zlib"),
      events: require.resolve("events/"),
      path: require.resolve("path-browserify"),
      fs: require.resolve("browserify-fs"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      url: require.resolve("url/"),
      querystring: require.resolve("querystring-es3"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      manifest: "./public/manifest.json",
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.ProvidePlugin({
      stream: "stream-browserify",
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
  ],
};
