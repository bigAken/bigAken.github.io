const Koa = require('koa')
const proxy = require('koa2-proxy-middleware')
const bodyparser = require('koa-bodyparser')

const app = new Koa()
var cors = require('koa2-cors')
app.use(
	cors({
		origin: function (ctx) {
			console.log('ctx', ctx)
			return '*'
		},
		exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
		maxAge: 5,
		credentials: true,
		allowMethods: ['GET', 'POST', 'DELETE'],
		allowHeaders: ['Content-Type', 'Authorization', 'Accept']
	})
)
app.use(async (ctx, next) => {
	const header = ctx.header
	header.authorization = '1111111'
	console.log('ctx.header', ctx.header)
	// ctx.set('header.')
	await next()
})

const options = {
	targets: {
		'/github/(.*)': {
			target: 'https://api.github.com', //后端服务器地址
			changeOrigin: true, //处理跨域
			pathRewrite: {
				'^/github': ''
			}
		}
	}
}
app.use(
	bodyparser({
		enableTypes: ['json', 'form', 'text']
	})
)

app.use(proxy(options))

app.listen(3011, () => {
	//http://localhost:3000这是当前服务器的端口号
	console.log('服务器启动成功！') //会在cmd命令符中显示这句话提示我们
})
