'use strict'
const path = require('path')

module.exports = {
	context: path.resolve(__dirname, './'),
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'@': path.resolve('src'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@layouts': path.resolve(__dirname, 'src/layouts'),
			'@views': path.resolve(__dirname, 'src/views'),
			'@comp': path.resolve(__dirname, 'src/components'),
			'@api': path.resolve(__dirname, 'src/api'),
			'@plug': path.resolve(__dirname, 'src/plugins'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@styles': path.resolve(__dirname, 'src/styles')
		}
	}
}