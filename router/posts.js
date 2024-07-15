import express from 'express'

import controller from '../controller/controllerPosts.js'

const router = express.Router()

router.post('/createPost', controller.createPost)
router.get('/getPost', controller.getPosts)
router.get('/getSinglePost', controller.getSinglePost)
router.put('/updateUserProfile', controller.updateUserProfile)
router.delete('/deletePost', controller.deletePost)
export default router
