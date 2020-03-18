// /*
// 在开始前你需要先理解 五大 核心概念 

// - 入口(entry)
// - 输出(output)
// - 加载器(loader)
// - 插件(plugin)
// - 模式(mode)

// */

// module.exports = {
   
//     //由于忽略了entry,故将使用默认值
//     //由于忽略了output,故将使用默认值


//     mode: "production",  //webpack 的 五大核心概念 之一 ,详见NOTESBYOLIVER.md

//     // Enable sourcemaps for debugging webpack's output.
//     devtool: "source-map",

//     resolve: {
//         // Add '.ts' and '.tsx' as resolvable extensions.
//         extensions: [".ts", ".tsx"]
//     },

//     module: {  //并非使用"loader"关键字, 因为 本质上 "loader"所处理的就是 "module"
//         rules: [
//             {

//                 /*
//                 钱字符$ -- 严格匹配用户输入的尾部。如果多行标志被设置为 true，那么也匹配换行符前的位置。
//                 例如，/t$/ 并不会匹配 "eater" 中的 't'，但是会匹配 "eat" 中的 't'。

//                 问号? -- 匹配左侧 表达式 0 次或 1 次。等价于 {0,1}。
//                 例如，/e?le?/ 匹配 "angel" 中的 'el'、"angle" 中的 'le' 以及 "oslo' 中的 'l'。
                
//                 */
//                 test: /\.ts(x?)$/,    
//                 exclude: /node_modules/,
//                 use: [
//                     {
//                         loader: "ts-loader"
//                     }
//                 ]
//             },
//             // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
//             {
//                 enforce: "pre",
//                 test: /\.js$/,
//                 loader: "source-map-loader"
//             }
//         ]
//     },

//     // When importing a module whose path matches one of the following, just
//     // assume a corresponding global variable exists and use that instead.
//     // This is important because it allows us to avoid bundling all of our
//     // dependencies, which allows browsers to cache those libraries between builds.
//     externals: {
//         "react": "React",
//         "react-dom": "ReactDOM"
//     }
// };






module.exports = {
    mode: "production",

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};