// const express = require('express');
import express from 'express'
import swaggerUi from "swagger-ui-express";
import swaggerDoc from 'swagger-jsdoc'
import dotenv from 'dotenv'
import 'express-async-errors'
import colors from 'colors'
import connectDB from './config/db.js';
import testRouters from "./route/testRoute.js";
import authRoute from "./route/authRoute.js"
import cors from "cors";
import morgan from "morgan"
import userRoutes from './route/userRoute.js'
import jobsRoutes from './route/jobsRoute.js'
import errorMiddlwware from './middelware/errorMiddleware.js';
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
dotenv.config();
connectDB()
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Job Portal Application',
            description: 'Node Expressjs Job Portal Application'
        },
        servers: [
            { url: "http://localhost:8080" }
        ]
    },
    apis: ['./routes/*.js']

}
const spec = swaggerDoc(options);
const app = express();
app.use(helmet());
app.use(xss());
app.use(mongoSanitize())
app.use(express.json())
app.use(cors());
app.use(morgan("dev"))

app.use("/api/vi/test", testRouters);
app.use("/api/vi/auth", authRoute);
app.use("/api/vi/user", userRoutes);
app.use("/api/vi/jobs", jobsRoutes);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec))

//validation middleware
app.use(errorMiddlwware)
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT} in ${process.env.DEV_MODE}`.bgCyan.white)
})