
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',

        //告诉webpack输出的js文件中不使用箭头函数
        environment: {
            arrowFunction: false, // 不使用箭头函数
            const: false // 不使用const(兼容ie10)
        }
    },
    mode: 'production',
    // 设置引入的模块
    resolve: {
        extensions: ['.ts', '.js']
    },

    // webpack打包要使用的loader、plugin
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader', // 将新的es标准转换为旧的标准
                        options: {
                            presets: [
                                [
                                    // 指定环境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 兼容浏览器版本
                                        targets: {
                                            "chrome": "88",
                                            "ie": "11"
                                        },
                                        // 指定corejs的版本
                                        "corejs": "3",
                                        // useage:表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 引入postcss-loader 解决css兼容性问题（bable-loader解决js兼容性问题）
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            "browsers": "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}