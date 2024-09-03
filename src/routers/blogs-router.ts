import {Router} from "express";
import {Request, Response} from "express";
import {RequestWithParams, Param, RequestWithParamsAndBody, RequestWithBody} from "../types/types";
import {BlogInputModel} from "../types/blogs-types";
import {authMiddleware} from "../middlewares/authorization";
import {blogsValidation} from "../validators/blogs-validator";
import {BlogsService} from "../domain/blogs-service";


export const blogsRouter = Router({})

blogsRouter.get('/', async (req: Request, res: Response) => {
    const blogs = await BlogsService.getAllBlogs()
    res.send(blogs)
})
blogsRouter.get('/:id', async (req: RequestWithParams<Param>, res:Response) => {
    const blog = await BlogsService.getBlogById(req.params.id)
    if (!blog) {
        res.sendStatus(404)
        return
    }
    res.send(blog)
})
blogsRouter.post('/', authMiddleware, blogsValidation(), async (req: RequestWithBody<BlogInputModel>, res: Response) => {
    const blog = await BlogsService.createBlog(req.body)
    res.status(201).send(blog)
})
blogsRouter.put('/:id', authMiddleware, blogsValidation(), async (req: RequestWithParamsAndBody<Param, BlogInputModel>, res: Response) => {
    const isUpdated = await BlogsService.updateBlog(req.params.id, req.body)
    if (!isUpdated) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})
blogsRouter.delete('/:id', authMiddleware, async (req: RequestWithParams<Param>, res: Response) => {
    const isDeleted = await BlogsService.deleteBlog(req.params.id)
    if (!isDeleted) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})