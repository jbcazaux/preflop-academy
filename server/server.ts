import Koa from 'koa'
import Router from 'koa-router'
import json from 'koa-json'

const app = new Koa()
const router = new Router()

router.get('/', async (ctx, next) => {
    ctx.body = {message: 'hello'}
    await next()
})

app.use(json())

app
    .use(router.routes())
    .use(router.allowedMethods())
    // eslint-disable-next-line no-console
    .listen(3000, () => console.log('koa started'))

