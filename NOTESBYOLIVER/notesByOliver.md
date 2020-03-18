# ***Vocabulary***

```
PS:7个一组
///
regex(复数形式 regexes)  正则表达式
dependency graph   依赖关系图,依赖图
valid modules  有效模块
intention  意图 , 目标
craft  速成,快速掌握
get the most out of sth  充分利用某事物
Word boundary  单词边界 

///
quantifier   量词
escaped literals 转义文字字符
flavor 流派,分流,风格,风味
trade-off  权衡取舍
A  can be leveraged to do  B  利用A 完成 B
bundle vt. 捆绑,打包
bundler  n. 打包工具 (e.g. Webpack,)

///
capability n. 能力,功能
take place  [作谓语] (某事情,某功能)发生
recap  vt. 扼要重述 ; 挑重点回顾一番
network bottleneck 网络瓶颈
are wrapped by 被封装于(单个文件)
concatenate  vt 拼接,组装
squish  vt 压缩(成一体)

///
treeshake  vt  树立,建立
(code) chunks   n. 代码块
era  [ˈɪərə] n. 时代,纪元
introduce vt  引入, 带来 ; 介绍
mass   adj. 大规模的,众多的, 大量的
mass-distribution 大规模分发

```



# 1# ~~~

Webpack工具  可以将你的  工程源码 和 工程依赖  捆绑( bundle vt. 捆绑,打包 )成一个单独的`.js`文件



# 2# 工程依赖 和 依赖声明

使用`@types/`前缀表示我们需要 额外获取 React和React-DOM的声明文件。 通常当你导入像`"react"`这样的路径，它会查看`react`包； 

然而，并不是所有的包都包含了声明文件，所以TypeScript还会查看`@types/react`包。 



# 3# 黏性依赖

 添加开发时所需的 ***黏性依赖***  [ts-loader](https://www.npmjs.com/package/ts-loader)和[source-map-loader](https://www.npmjs.com/package/source-map-loader)

```
npm install --save-dev typescript ts-loader source-map-loader
```

这些 黏性依赖 会让 TypeScript 和 webpack 在一起高效地 协同工作。 

`ts-loader`可以让Webpack使用TypeScript的标准配置文件`tsconfig.json`编译TypeScript代码。 source-map-loader使用TypeScript输出的sourcemap文件来告诉webpack何时生成_自己的_sourcemaps( 这就允许你在调试最终生成的文件时就好像在调试TypeScript源码一样)。



PS: 请注意，`ts-loader`并不是唯一的`TypeScript`加载器。

PPS: 你还可以选择[awesome-typescript-loader](https://www.npmjs.com/package/awesome-typescript-loader)。 可以到[这里](https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader)查看它们之间的区别。

PPPS: 注意需要安装 工程依赖 TypeScript,  我们还有第二种方法即 `npm link typescript`来链接TypeScript到一个全局拷贝，但这不是常见用法。



# 4#webpack的 核心概念 - 另附PDF

```
源自 https://webpack.docschina.org/concepts/
```

## (1)

### 概念的具体表现形式:

本节所介绍的核心概念 , 全部会在名为 "webpack.config.js"的文件中所体现 !!!



### 五大核心概念 :

本质上，**webpack** 是一个现代 JavaScript 应用程序的*静态模块打包工具*。当 webpack 处理应用程序时，它会在内部构建一个 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/)，此依赖图会映射项目所需的每个模块，并生成一个或多个 *bundle*。

> 可以在 [这里](https://webpack.docschina.org/concepts/modules) 了解更多关于 JavaScript 模块和 webpack 模块的信息。

从 v4.0.0 开始，**webpack 可以不用再引入一个配置文件**来打包项目，然而，但它仍然有着 [高度可配置性](https://webpack.docschina.org/configuration)，可以很好满足你的需求。

在开始前你需要先理解 五大 **核心概念** 

> PS:	以下的5个 关键字都具备 默认值 , 如若 "webpack.config.js"中未出现对应值, ... ...

- 入口(entry)
- 输出(output)
- 加载器(loader)
- 插件(plugin)
- 模式(mode)



> 为了更好地理解 "Web模块打包工具" 背后的理念，以及在底层它们是如何运作的，请参考以下资源：
>
> - [手动打包一个应用程序](https://www.youtube.com/watch?v=UNMkLHzofQI)
> - [实时创建一个简单打包工具](https://www.youtube.com/watch?v=Gc9-7PBqOC8)
> - [一个简单打包工具的详细说明](https://github.com/ronami/minipack)



### 入口(entry) 

**入口起点(entry point)**指示 webpack 应该使用哪个模块，来作为构建其内部 *依赖图(dependency graph)* 的起点。

进入entry后，webpack 会找出有哪些 "模块+库" 是 entry（直接和间接）所依赖的。

entry的默认值是 `./src/index.js`，开发者可以通过在 [webpack configuration](https://webpack.docschina.org/configuration) 中自定义 **entry** 属性，来指定一个（或多个）不同的入口起点。例如：



```
//webpack.config.js 代码示例

module.exports = {
  entry: './path/to/my/entry/file.js'
};
```



### 输出(output) 

**output** 属性告诉 webpack 在哪里输出它所创建的 *bundle*，以及如何命名这些文件。

生成的 主要性文件的路径默认值是 `./dist/main.js`，次要性文件的 路径默认值默认放置在 `./dist` 。

你可以通过在配置中指定一个 `output` 字段，来配置这些处理过程：



```
//webpack.config.js 代码示例

const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

在上面的示例中，我们通过 `output.filename` 和 `output.path` 属性，来告诉 webpack bundle 的名称，以及我们想要 bundle 生成(emit)到特定文件夹中。

> 可能你想要了解在代码最上面导入的 path 模块是什么，它是一个 [Node.js 核心模块](https://nodejs.org/api/modules.html)，用于操作文件路径。



### 加载器 Loader

Out of the box, webpack only understands JavaScript and JSON files. **Loaders** allow webpack to process other types of files and convert them into valid [modules](https://webpack.js.org/concepts/modules) that can be consumed by your application and added to the dependency graph.

> Note that the ability to `import` any type of module, e.g. `.css` files, is a feature specific to webpack and may not be supported by other bundlers or task runners. We feel this extension of the language is warranted as it allows developers to build a more accurate dependency graph.

At a high level, **loaders** have two properties in your webpack configuration:

1. The `test` property identifies which file or files should be transformed.
2. The `use` property indicates which loader should be used to do the transforming.



```
//webpack.config.js   代码示例

const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {  //并非使用"loader"关键字, 因为 本质上 "loader"所处理的就是 "module"
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]	
  }
};
```

The configuration above has defined a `rules` property for a single module with two required properties: `test` and `use`. This tells webpack's compiler the following:

> "Hey webpack compiler, when you come across a path that resolves to a '.txt' file inside of a `require()`/`import` statement, **use** the `raw-loader` to transform it before you add it to the bundle."

> It is important to remember that when defining rules in your webpack config, you are defining them under `module.rules` and not `rules`. For your benefit, webpack will warn you if this is done incorrectly.

> Keep in mind that when using regex to match files, you may not quote it. i.e `/\.txt$/` is not the same as `'/\.txt$/'` or `"/\.txt$/"`. The former instructs webpack to match any file that ends with .txt and the latter instructs webpack to match a single file with an absolute path '.txt'(PS:这句话 可能是指 路径当中包含".txt"关键字); this is likely not your intention.





### 插件 Plugin

While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.

> Check out the [plugin interface](https://webpack.js.org/api/plugins) and how to use it to extend webpack's capabilities.

In order to use a plugin, you need to `require()` it and add it to the `plugins` array. Most plugins are customizable through options. Since you can use a plugin multiple times in a configuration for different purposes, you need to create an instance of it by calling it with the `new` operator.

**webpack.config.js**

```
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [  //PS: 这里就定义了一个 , plugins数组
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```

In the example above, the `html-webpack-plugin` generates an HTML file for your application by injecting automatically all your generated bundles.

> There are many plugins that webpack provides out of the box! Check out the [list of plugins](https://webpack.js.org/plugins).

Using plugins in your webpack configuration is straightforward. However, there are many use cases that are worth further exploration. [Learn more about them here](https://webpack.js.org/concepts/plugins).



### 模式(mode)

By setting the `mode` parameter to either `development`, `production` or `none`, you can enable webpack's built-in optimizations which correspond to each environment. Its default value is `production`.

```
module.exports = {
  mode: 'production'
};
```

Learn more about the [mode configuration here](https://webpack.js.org/configuration/mode) and what optimizations take place on each value.

> 译文: 在此处了解有关模式配置的更多信息，以及对每个值进行的优化。





# (2) 为什么要使用 Webpack?

```
原文链接 https://webpack.js.org/concepts/why-webpack/
```

> JavaScript is taking over the world as a language, as a platform and as a way to rapidly develop and create fast applications.
>
>  作为一门语言,一个平台, 快速开发制造程序的一种方式,JS 在未来拥有广阔的发展天地!	



> 是否可以有一种方式，不仅可以让我们编写模块，而且还支持任何模块格式（至少在我们到达 ESM 之前），并且可以同时处理资源和资产？
>
> 这就是 webpack 存在的原因。它是一个工具，可以打包你的 JavaScript 应用程序（支持 ESM 和 CommonJS），可以扩展支持许多不同的Assets，例如：images, fonts 和 stylesheets。 
>
> Webpack 不仅关心性能和加载时间；而且 它始终在改进或添加新功能，例如：异步地加载 chunk 和预取.



# 5# Regex 基于JavaScript - 另附PDF

```
Regex核心内容:
https://www.regular-expressions.info/tutorialcnt.html

基于Javascript的Regex教程: 
developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions

```

> 这篇简介涵盖如下内容:
>
> (1) Regex 的常见用途
>
> (2) Regex 到底长什么样子(即 代码示例)
>
> (3) Regex 基本语法 (基于你当前的求职方向,选择对应的Regex流派的教程!!!)



### (1)Regex的 定义 与 构成元素

```
https://www.regular-expressions.info/tutorialcnt.html
```

***定义***

正则表达式是用于匹配字符串中字符组合的模式。

> A regular expression, or regex for short, is a pattern describing a certain amount of text.
>
> Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects.



***构成元素***

简单模式 与 特殊字符

> 简单模式是由你想直接找到的字符构成。比如，`/abc/` 这个模式就能且仅能匹配 "abc" 字符按照顺序同时出现的情况。 
> 例如在 "Hi, do you know your abc's?" 和 "The latest airplane designs evolved from slabcraft." 中会匹配成功。在上述两个例子中，匹配的子字符串是 "abc"。但是在 "Grab crab" 中会匹配失败，因为它虽然包含子字符串 "ab c"，但并不是精准的 "abc"。 



> 1>
>
> 特殊字符 帮助开发者 匹配一个不确定的字符串时，比如寻找一个或多个 "b"，或者寻找空格。
>
> 特殊字符的字符集合 详见PDF附件
>
> 比如，你可以使用 `/ab*c/` 去匹配一个单独的 "a" 后面跟了零个或者多个 "b"，同时后面跟着 "c" 的字符串：`*`的意思是前一项出现零次或者多次。在字符串 "cbbabbbbcdebc" 中，这个模式匹配了子字符串 "abbbbc"。
>
> 2>我们对 特殊字符集合进行了 二次分类
>
> 断言（Assertions）
> 表示一个匹配在某些条件下发生。断言包含先行断言、后行断言和条件表达式。
>
> 边界（Boundaries）
> 表示行和单词的开始和结尾。
>
> 字符类别（Character Classes）
> 区分不同类型的字符，例如区分字母和数字。
>
> 组和范围（Groups and Ranges）
> 表示表达式字符的分组和范围。
>
> 量词（Quantifiers）
> 表示匹配的字符或表达式的数量。
>
> Unicode 属性转义（Unicode Property Escapes）
> 基于 unicode 字符属性区分字符。例如大写和小写字母、数学符号和标点。







### (2)regex-flavor 正则表达式的流派

As usual in the software world, different regular expression engines are not fully compatible with each other. The syntax and behavior of a particular engine is called a regular expression flavor. This tutorial covers all the popular regex flavors,including Perl, PCRE, PHP, .NET, Java, JavaScript, XRegExp, Python, Ruby, Delphi, R, Tcl, POSIX, and many others.  



### (3)Regex语法 - 基于JavaScript引擎

```
developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
```

1> Regex 的常见用途

正则表达式是用于匹配字符串中字符组合的模式。

在 JavaScript中，正则表达式也是对象。这些模式被用于 Regex 的 exec 和 test 方法, 以及 String 的 match、matchAll、replace、search 和 split 方法.

> Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects. These patterns are used with the exec() and test() methods of RegExp, and with the match(), matchAll(), replace(), search(), and split() methods of String. 



2> Regex 到底长什么样子(即 代码示例)

一 , 使用一个正则表达式字面量，其由包含在斜杠之间(称为 正则起始符 和 正则终止符)的模式组成，如下所示：

```
/ab+c/
```

脚本加载后，正则表达式字面量就会被编译。当正则表达式保持不变时，使用此方法可获得更好的性能。



二, 调用`RegExp`对象的构造函数，如下所示：

```
var re = new RegExp("ab+c");
```

在脚本运行过程中，用构造函数创建的正则表达式会被编译。如果正则表达式将会改变，或者它将会从用户输入等来源中动态地产生，就需要使用构造函数来创建正则表达式。

三, 示例

```
   module: {  //并非使用"loader"关键字, 因为 本质上 "loader"所处理的就是 "module"
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
```



# 6#何为 "Network Bottleneck"?

> URI : wikiwand.com/en/Bottleneck

### (1)

In a [communication network](https://www.wikiwand.com/en/Communication_network), sometimes a [max-min fairness](https://www.wikiwand.com/en/Max-min_fairness) of the network is desired, usually opposed to the basic [first-come first-served](https://www.wikiwand.com/en/First-come_first-served) policy. With max-min fairness, data flow between any two nodes is maximized, but only at the cost of *more or equally expensive* data flows. To put it another way, in case of [network congestion](https://www.wikiwand.com/en/Network_congestion)any data flow is only impacted by smaller or equal flows.

In such context, a **bottleneck link** for a given data flow is a link that is fully utilized (is *saturated*) and of all the flows sharing this link, the given data flow achieves maximum data rate network-wide.[[1\]](https://www.wikiwand.com/en/Bottleneck_(network)#citenote1) Note that this definition is substantially different from a common meaning of a *bottleneck*. Also note, that this definition does not forbid a single link to be a bottleneck for multiple flows.

A data rate allocation is max-min fair if and only if a data flow between any two nodes has at least one bottleneck link.



### (2)

A **network bottleneck** refers to a discrete condition in which data flow is limited by computer or **network** resources. The flow of data is controlled according to the bandwidth of various system resources. 

A common computing **bottleneck** culprit is **network** data interruption caused by microprocessor circuitry or TCP/IP

> 译文:网络瓶颈是指离散条件，其中数据流受到计算机或网络资源的限制。 数据流是根据各种系统资源的带宽控制的。 
>
> 常见的计算瓶颈是由微处理器电路或TCP / IP引起的网络数据中断



