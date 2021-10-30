const path = require('path')
module.exports = {
	publicPath: '/',
	outputDir: 'dist',
	assetsDir: './',
	productionSourceMap: false,
	// https://github.com/qingwei-li/vue-markdown-loader/issues/61
	parallel: false,
	chainWebpack(config) {
		config.plugins.delete('preload') // TODO: need test
		config.plugins.delete('prefetch') // TODO: need test

		// 配置svg
		config.module.rule('svg').exclude.add(path.resolve('src/icons')).end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(path.resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()
		config.module
			.rule('md')
			.test(/\.md/)
			.use('vue-loader')
			.loader('vue-loader')
			.end()
			.use('vue-markdown-loader')
			.loader('vue-markdown-loader/lib/markdown-compiler')
			.options({
				raw: true
			})
			.end()
		config.optimization.splitChunks({
			chunks: 'all',
			cacheGroups: {
				libs: {
					name: 'chunk-libs',
					test: /[\\/]node_modules[\\/]/,
					priority: 10,
					chunks: 'initial' // only package third parties that are initially dependent
				},
				elementUI: {
					name: 'chunk-elementUI', // split elementUI into a single package
					priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
					test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
				},
				commons: {
					name: 'chunk-commons',
					test: path.resolve('src/components'), // can customize your rules
					minChunks: 3, //  minimum common number
					priority: 5,
					reuseExistingChunk: true
				}
			}
		})
		config.optimization.runtimeChunk('single')
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}
