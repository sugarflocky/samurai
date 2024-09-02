import {Router} from "express";
import {Request, Response} from "express";
import {RequestWithParams, Param, RequestWithParamsAndBody, RequestWithBody} from "../types/types";
import {BlogInputModel} from "../types/blogs-types";
import {BlogsRepository} from "../repositories/blogs-repository";
import {authMiddleware} from "../middlewares/authorization";
import {blogsValidation} from "../validators/blogs-validator";


export const blogsRouter = Router({})

blogsRouter.get('/', (req: Request, res: Response) => {
    res.send(BlogsRepository.getAllBlogs())
})
blogsRouter.get('/:id', (req: RequestWithParams<Param>, res:Response) => {
    const blog = BlogsRepository.getBlogById(req.params.id)
    if (!blog) {
        res.sendStatus(404)
        return
    }
    res.send(blog)
})
blogsRouter.post('/', authMiddleware, blogsValidation(), (req: RequestWithBody<BlogInputModel>, res: Response) => {
    const blog = BlogsRepository.createBlog(req.body)
    res.status(201).send(blog)
})
blogsRouter.put('/:id', authMiddleware, blogsValidation(), (req: RequestWithParamsAndBody<Param, BlogInputModel>, res: Response) => {
    const isUpdated = BlogsRepository.updateBlog(req.params.id, req.body)
    if (!isUpdated) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})
blogsRouter.delete('/:id', authMiddleware, (req: RequestWithParams<Param>, res: Response) => {
    const isDeleted = BlogsRepository.deleteBlog(req.params.id)
    if (!isDeleted) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})