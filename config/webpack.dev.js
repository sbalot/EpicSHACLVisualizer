const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");
// const express = require('express')
const PORT = packageJson.port;
const deps = packageJson.dependencies
const path = require('path')
// const moduleConfig = require('./configuration.json')

// function setRemoteModules () {
//   const modules = {}
//   Object.keys(moduleConfig).forEach((key) => {
//     modules[moduleConfig[key].scope] = `${moduleConfig[key].scope}@${moduleConfig[key].url}`
//     if (moduleConfig[key].children) {
//       Object.keys(moduleConfig[key].children).forEach(child => {
//         modules[moduleConfig[key].children[child].scope] = `${moduleConfig[key].children[child].scope}@${moduleConfig[key].children[child].url}`
//       })
//     }
//   })
//   console.log(`modules`, modules)
//   return modules
// }

const devConfig = {
  mode: "development",
  output: {
    publicPath: `http://localhost:${PORT}/`,
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  devServer: {
    port: PORT,
    historyApiFallback: true,
    static: path.join(__dirname, "build"),
    compress: true,
    client: {logging: "none"}
    // setup(app) {
    //   app.use('/public/', express.static(path.join(__dirname, 'public')))
    // }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: packageJson.name,
      filename: 'remoteEntry.js',
      exposes: {
          "./index": "./src/bootstrap"
      },
      shared: {
        // ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        events: {eager: true, requiredVersion: deps.events},
      },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
