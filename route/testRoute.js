import express from 'express'
import { testPostController } from '../controller/testController.js'
import userAuth from '../middelware/authMiddleware.js';
const router = express.Router()

router.post('/test-post', userAuth, testPostController)
export default router;
