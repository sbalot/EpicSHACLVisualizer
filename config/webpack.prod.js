const {merge} = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJSON = require('../package.json')

const domain = packageJSON.domain

const prodConfig = {
    mode: 'production',
    output: {
        filename: "[name].[contenthash].js",
        publicPath: domain
    },
    plugins: [
        new ModuleFederationPlugin({
            name: packageJSON.name,
            filename: 'remoteEntry.js',
            exposes: {
                "./index": "./src/bootstrap"
            },
            shared: {...packageJSON.dependencies}
        })
    ]
}

module.exports = merge(commonConfig, prodConfig)