import express from 'express'
import userAuth from '../middelware/authMiddleware.js';
import { getUserController, updateUserController } from '../controller/userController.js';

const router = express.Router();

//update user|| put
router.get("/", userAuth, getUserController);
router.put("/update-user", userAuth, updateUserController)
export default router;