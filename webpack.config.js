const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const dir = fs.readdirSync('resources/react', {withFileTypes: true});
const entries = Object.fromEntries(dir.filter(d => !d.name.startsWith('_') && d.isDirectory()).map(({name}) =>
    [name, path.resolve(__dirname, 'resources', 'react', name, 'index.jsx')])
);

module.exports = (env) => {

    let isProd = false
    let isSrv = false;

    const TARGET = process.env.npm_lifecycle_event;
    if (TARGET == 'build') isProd = true;
    if (TARGET == 'dev') isSrv = true;

    const isAnalyze = env && env.analyze;

    console.log(`<<------------->>`)
    console.log(`<<-- WEBPACK -->>  Production ${isProd}    Srv ${isSrv} `);
    console.log(`<<------------->>`)

    return {
        mode: isProd ? 'production' : 'development',
        entry: entries,
        cache: true,
        target: 'web',

        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'public', 'js'),
            publicPath: isSrv ? "http://labelview.local:8080/js/" : undefined, //Fix per dominio hot reload updates
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    use: 'babel-loader'
                },
                {
                    test: /\.s?css$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'fonts/'
                            }
                        }
                    ]
                }
            ]
        },

        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                'react-dom': isSrv ? '@hot-loader/react-dom' : 'react-dom',
            }
        },

        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            }),
            isAnalyze ? new BundleAnalyzerPlugin() : false,
        ].filter(Boolean),

        devtool: isProd ? 'none' : 'cheap-module-eval-source-map', //'cheap-module-eval-source-map'  'source-map'

        devServer: {
            hot: true,
            host: '0.0.0.0',
            port: 8080,
            disableHostCheck: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }

        },

        optimization: {
            splitChunks: isSrv ? false : {chunks: "all", name: "vendors"}
        },


    };
}
