import express from "express";
import {postsRouter} from "./routers/posts-router";
import {blogsRouter} from "./routers/blogs-router";
import {testingRouter} from "./routers/testing-router";
import dotenv from "dotenv";
import {runDb} from "./db/db";
dotenv.config();

const port = process.env.PORT || 5000

export const app = express()

app.use(express.json());

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing/all-data', testingRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
}

startApp()
