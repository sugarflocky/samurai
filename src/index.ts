import express from "express";
import {postsRouter} from "./routers/posts-router";
import {blogsRouter} from "./routers/blogs-router";
import {testingRouter} from "./routers/testing-router";

const port = process.env.PORT || 3000
export const app = express()

app.use(express.json());

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/testing/all-data', testingRouter)


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

