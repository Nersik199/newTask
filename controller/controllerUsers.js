import { v4 as uuid } from 'uuid'
let users = [
	{
		id: '1',
		fName: 'John',
		lName: 'Doe',
		email: 'nCpWt@example.com',
	},
]

async function getSingleUsers(req, res) {
	try {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		const usersInfo = await req.body
		usersInfo.id = uuid()

		if (users.some(user => user.email === usersInfo.email)) {
			res.statusCode = 500
			res.json({ message: 'Email already exists', status: 500 })
			return
		}

		if (!emailRegex.test(usersInfo.email)) {
			res.statusCode = 500
			res.json({ message: 'Invalid email address', status: 500 })
			return
		}

		users.push(usersInfo)

		res.statusCode = 200
		res.json({ message: 'register success', status: 200 })
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message, status: 404 })
	}
}

async function usersLogin(req, res) {
	try {
		const { email, password } = await req.body
		let result = users.find(item => {
			return item.email === email && item.password === password
		})
		if (result) {
			res.statusCode = 200
			res.json({ message: 'Login successful', user: result })
		} else {
			res.statusCode = 500
			res.send({ message: 'User not found', status: 500 })
		}
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message, status: 404 })
	}
}

function getUsersList(req, res) {
	try {
		if (users.length === 0) {
			res.statusCode = 500
			res.send({ message: 'User not found', status: 500 })
		}
		res.statusCode = 200
		res.json({ message: 'user list', status: 200, data: users })
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message, status: 404 })
	}
}

async function getUserProfile(req, res) {
	const result = users.find(item => {
		return item.id === req.query.id
	})
	if (result) {
		res.statusCode = 200
		res.json({ message: 'user profile', data: result })
	} else {
		res.statusCode = 404
		res.send({ message: 'User not found' })
	}
}

async function updateUserProfile(req, res) {
	try {
		const { id, fName, lName, email, password } = await req.body
		let index = users.findIndex(user => user.id === id)

		if (index !== -1) {
			users[index].fName = fName
			users[index].lName = lName
			users[index].email = email
			users[index].password = password
			res.statusCode = 200
			res.json({ message: 'User updated successfully', user: users[index] })
		} else {
			res.statusCode = 500
			res.json({ message: `User with id ${id} not found` })
		}
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message })
	}
}

function deleteUser(req, res) {
	try {
		const { id } = req.query
		let index = users.findIndex(user => user.id === id)
		if (index !== -1) {
			users.splice(index, 1)
			res.statusCode = 200
			res.json({ message: 'User deleted successfully', delId: id })
		} else {
			res.statusCode = 404
			res.send({ message: 'User not found' })
		}
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message })
	}
}

export default {
	getSingleUsers,
	getUsersList,
	usersLogin,
	getUserProfile,
	updateUserProfile,
	deleteUser,
}
