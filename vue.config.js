/*
* time 2018-12-14
* */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //Webpack包文件分析器
let isHash
if(process.env.VUE_APP_CURRENTMODE == 'stage' || process.env.VUE_APP_CURRENTMODE == 'local' ) {
    isHash = false
} else {
    isHash = true
}
module.exports = {
    baseUrl: process.env.baseUrl,
    productionSourceMap: false,
    filenameHashing: isHash,
    outputDir: process.env.outputDir,
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options => Object.assign(options, { limit: 500 }));
        config.plugins.delete('prefetch') // 移除prefetch(告诉浏览器在页面加载完成后，利用空闲时间提前获取用户未来可能会访问的内容)
        config.plugins.delete('preload')  //移除preload(指定页面加载后很快会被用到的资源)

    },
    configureWebpack:(config)=>{
        //入口文件
        config.entry = ['babel-polyfill', './src/main.js'];
        let pluginsPro = [  //生产and测试环境
            new BundleAnalyzerPlugin(),  //	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
        ];
        let pluginsDev = [  //开发环境
            // new vConsolePlugin({  //移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
            //     filter: [], // 需要过滤的入口文件
            //     enable: true // 发布代码前记得改回 false
            // }),
        ];
        if (process.env.NODE_ENV === 'development') {  // 为开发环境修改配置...
            config.plugins = [...config.plugins, ...pluginsDev];
        } else {  // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
            config.plugins = [...config.plugins, ...pluginsPro];
        }
    },
    devServer: {
        host: '****',
        port: 8089,
        https: false,
        open: true, //配置自动启动浏览器
        hotOnly: true, // 热更新
        proxy: {
            '/weather': {
                target: 'http://weatherapi.market.xiaomi.com/wtr-v2/',
                changeOrigin: true,
            },
            '/movie': {
                target: 'https://api-m.mtime.cn/',
                changeOrigin: true,
                pathRewrite: {
                    '^/movie': ''
                }
            },
            '/api': {
                target: 'http://****/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    lintOnSave: false,
    css: {
        extract: {
            filename: process.env.cssFilename,
            chunkFilename: 'css/[id].css'
        },
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    }
};