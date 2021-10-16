const path = require('path');

const nodeConfig = {
    target: 'node',
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'covid-core.node.js',
        libraryTarget: 'commonjs',
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: /node_modules/,
            },
        ],
    },
    stats: {
        warnings: false,
    },
};

const webConfig = {
    target: 'web',
    mode: 'production',
    devtool: 'source-map',
    entry: {
        'covid-core': './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'covid-core.min.js',
        library: 'covid',
        libraryTarget: 'window',
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: '> 2.5%',
                                },
                            ],
                        ],
                        sourceType: 'unambiguous',
                    },
                },
            }
        ],
    },
};

module.exports = [nodeConfig, webConfig];
