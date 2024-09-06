import {Router} from "express";
import {Response} from "express";
import {
    RequestWithParams,
    Param,
    RequestWithParamsAndBody,
    RequestWithBody,
    RequestWithQuery,
    RequestWithParamsAndQuery
} from "../types/types";
import {BlogInputModel, QueryBlogInputModel} from "../types/blogs-types";
import {authMiddleware} from "../middlewares/authorization";
import {blogsValidation} from "../validators/blogs-validator";
import {BlogsService} from "../domain/blogs-service";
import {postsFromBlogValidation} from "../validators/posts-validator";
import {PostInBlogInputModel, QueryPostInputModel} from "../types/posts-types";
import {PostsService} from "../domain/posts-service";


export const blogsRouter = Router({})

blogsRouter.get('/', async (req: RequestWithQuery<QueryBlogInputModel>, res: Response) => {
    const sortData = {
        searchNameTerm: req.query.searchNameTerm ?? null,
        sortBy: req.query.sortBy ?? 'createdAt',
        sortDirection: req.query.sortDirection ?? 'desc',
        pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize: req.query.pageSize ? +req.query.pageSize : 10
    }

    const blogs = await BlogsService.getAllBlogs(sortData)
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

blogsRouter.get('/:id/posts', async (req: RequestWithParamsAndQuery<Param, QueryPostInputModel>, res: Response) => {
    const sortData = {
        sortBy: req.query.sortBy ?? 'createdAt',
        sortDirection: req.query.sortDirection ?? 'desc',
        pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize: req.query.pageSize ? +req.query.pageSize : 10
    }

    const posts = await PostsService.getPostsByBlogId(req.params.id, sortData)
    res.send(posts)
})

blogsRouter.post('/:id/posts', authMiddleware, postsFromBlogValidation(), async (req: RequestWithParamsAndBody<Param, PostInBlogInputModel>, res: Response) => {
    const post = await PostsService.createPostInBlog(req.params.id, req.body)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.status(201).send(post)
})