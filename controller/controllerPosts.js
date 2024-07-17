import { v4 as uuid } from 'uuid'

async function createPost(req, res) {
	try {
		const postInfo = await req.body
		postInfo.id = uuid()
		posts.push(postInfo)
		res.statusCode = 200
		res.json({ message: 'createPost successful', status: 200 })
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message, status: 404 })
	}
}

async function getPosts(req, res) {
	try {
		let result = posts.find(item => {
			return item.userId === req.query.userId
		})
		if (result) {
			res.statusCode = 200
			res.json({ message: 'getPost successful', status: 200, data: result })
		} else {
			res.statusCode = 500
			res.send({ message: 'post not found', status: 500 })
		}
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message, status: 404 })
	}
}

function getSinglePost(req, res) {
	try {
		let result = posts.find(item => {
			return item.id === req.query.id
		})
		if (result) {
			res.statusCode = 200
			res.json({
				message: 'getSinglePost successful',
				status: 200,
				user: result,
			})
		} else {
			res.statusCode = 500
			res.send({ message: 'post not found', status: 500 })
		}
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message, status: 404 })
	}
}

async function updateUserProfile(req, res) {
	try {
		const { id, title, description } = await req.body
		let index = posts.findIndex(post => post.id === id)

		if (index !== -1) {
			posts[index].title = title
			posts[index].description = description
			res.statusCode = 200
			res.json({
				message: 'Post updated successfully',
				post: id,
			})
		} else {
			res.statusCode = 500
			res.json({ message: `Post with id ${id} not found` })
		}
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message, status: 404 })
	}
}

function deletePost(req, res) {
	try {
		const { id } = req.query
		let index = posts.findIndex(post => post.id === id)
		if (index !== -1) {
			posts.splice(index, 1)
			res.statusCode = 200
			res.json({ message: 'User deleted successfully', delId: id })
		} else {
			res.statusCode = 500
			res.send({ message: 'User not found' })
		}
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message })
	}
}

export default {
	createPost,
	getSinglePost,
	getPosts,
	updateUserProfile,
	deletePost,
}
