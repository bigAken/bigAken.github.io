module.exports = {
	presets: ['@vue/cli-plugin-babel/preset', ['@babel/preset-env', { modules: false }]],
	// 安修加载需要引入此包
	plugins: ['@babel/plugin-syntax-dynamic-import']
}
