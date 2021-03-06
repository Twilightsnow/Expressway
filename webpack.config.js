process.noDeprecation = true
const webpack = require('webpack')
const path = require('path')
const SRC = path.join(__dirname, 'src')
// const _join = (d) => path.join(__dirname, d)
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

module.exports = {
    entry: {
        js: path.join(SRC, 'index.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }, 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, 
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('precss'),
                                require('autoprefixer')
                            ]
                        }
                    }
                ]
            }, 
            {
                test: /\.json/,
                loader: 'json-loader'
            }, 
            {
                test: /\.(png|jpg|woff2?|ttf|eot|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 80000
                }
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: SRC,
        inline: true,
        progress: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        stats: { color: true },
        port: 3000
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            image: path.join(SRC, 'image')
        }
    },
    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }],
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new OpenBrowserPlugin({
            url: 'http://localhost:3000'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        })
    ]
}
