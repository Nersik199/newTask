import express from 'express'

import controller from '../controller/controllerUsers.js'

const router = express.Router()

router.post('/register', controller.getSingleUsers)
router.post('/login', controller.usersLogin)
router.get('/list', controller.getUsersList)
router.get('/profile', controller.getUserProfile)
router.put('/update', controller.updateUserProfile)
router.delete('/delete', controller.deleteUser)

export default router
