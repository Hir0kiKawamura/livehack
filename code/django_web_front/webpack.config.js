const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();
const { merge } = require('webpack-merge');

const baseConfig = {
    entry: {
        'livehack': ["./src/index.tsx"]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', ],
        alias: {
            'src': path.resolve(__dirname, 'src'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        },
    },
    module: {
        rules: [{
                test: /\.(ts|tsx)$/,
                exclude: /node_module/,
                // include: [ require.resolve('@kintone/kintone-js-sdk'), ],
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ["@babel/preset-env", {
                                    targets: {
                                        node: "current"
                                    }
                                }],
                                '@babel/preset-react',
                            ]
                        }
                    },
                    { loader: 'ts-loader' }
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_module/,
                // include: [ require.resolve('@kintone/kintone-js-sdk'), ],
                use: [
                    { loader: 'babel-loader', },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader', },
                    { loader: 'css-loader', },
                ],
            },
        ],
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: "custom html",
            template: path.resolve(__dirname, "public/index.html"),
        }),
    ],
};

const devConfig = merge(baseConfig, {
    mode: 'development',
    output: {
        path: path.resolve('dist'),
        filename: '[name].develop.bundle.js',
    },
});

const productConfig = merge(baseConfig, {
    mode: 'production',
    output: {
        path: path.join(__dirname, '../django_rest_api/livehack/static'),
        filename: '[name].bundle.js',
    },
})

module.exports = (env, argv) => {

    let config = argv.mode === 'production' ? productConfig : devConfig;

    return [config];
};