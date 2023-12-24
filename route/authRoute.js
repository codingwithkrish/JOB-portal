import express from 'express';
import { loginController, registerController } from '../controller/authController.js';
import rateLimit from 'express-rate-limit'
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type:Object
 *          required:
 *              - name
 *              - lastName
 *              - email
 *              - password
 *              - location
 *          properties:
 *              id:
 *                type:string
 *                description: The Auto-generated id of user collection
 *              name:
 *                type:string
 *                description: User name
 *              lastNmae:
 *                type:string
 *                description: User Last Name
 *              email:
 *                type:string
 *                description: User Email address
 *              password:
 *                type:string
 *                description: User password
 *              location:
 *                type:string
 *                description: User location
 *          example:
 *              id:FJJNKJO85858
 *                  name:Ishika
 *                  lastName:Agrawal
 *                  email:ishika@gmail.com
 *                  password:test@123
 *                  location:Pune
 *              
 * 
 * 
 */

//REGISTER \\ POST
router.post("/register", limiter, registerController);
//LOGIN || POST
router.post("/login", limiter, loginController)
export default router;