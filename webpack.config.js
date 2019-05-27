const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const extractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, "src/index.tsx"),
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js",
        publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".css"]
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, "/src/index.html")
        }),
        new extractTextPlugin('bundle.css')
    ]
};
