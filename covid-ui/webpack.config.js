const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => (
    {
        mode: 'production',
        entry: {
            'covid-ui': './src/index.tsx',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        devServer: {
            compress: false,
            port: 3000,
            historyApiFallback: true,
            proxy: [
                {
                    context: (param) =>
                    param.match(
                        /\/api\/v1\/covid\/.*/gm, /* Anything that has '/api/vi/covid/', map the base url to 'http://localhost:8080' */
                    ),
                    target: env && env.API_URL,
                    secure: false,
                    changeOrigin: true,
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
            plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-optional-chaining'
                            ],
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: '> 2.5%', // https://github.com/browserslist/browserslist
                                    },
                                ],
                                ['@babel/preset-react'],
                                ['@babel/typescript'],
                            ],
                            sourceType: 'unambiguous',
                        },
                    },
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                            },
                        },
                        'postcss-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.svg$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                        {
                            loader: 'react-svg-loader'
                        },
                    ],
                },
                {
                  test: /\.(png|jp(e*)g|gif)$/,
                  use: ['file-loader'],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                inject: 'body',
            }),
            new Dotenv({
                systemvars: true,
            }),
        ]
    }
)