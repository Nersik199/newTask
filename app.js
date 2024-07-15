import express from 'express'

const app = express()

import routerUsers from './router/users.js'
import routerPosts from './router/posts.js'
app.use(express.json())
app.use('/user', routerUsers)
app.use('/post', routerPosts)
app.use('/', (req, res) => {
	res.send('home')
})
app.listen(3000, () => {
	console.log('Example app listening on port 3000!')
})
