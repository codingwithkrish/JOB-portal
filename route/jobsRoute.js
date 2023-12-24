import express from 'express'
import userAuth from '../middelware/authMiddleware.js';
import { createJobController, deleteJobsController, getJobsController, jobsStatsController, updateJobController } from '../controller/jobController.js';
const router = express.Router()

//routes
router.get("/", userAuth, getJobsController)
router.post('/create-job', userAuth, createJobController)
router.patch('/update-job/:id', userAuth, updateJobController)
router.delete('/delete-job/:id', userAuth, deleteJobsController)

router.get('/jobs-stats', userAuth, jobsStatsController)


export default router;
