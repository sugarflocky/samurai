import {Router} from "express";
import {Response} from "express";
import {RequestWithParams, Param, RequestWithParamsAndBody, RequestWithBody, RequestWithQuery} from "../types/types";
import {PostInputModel, QueryPostInputModel} from "../types/posts-types";
import {authMiddleware} from "../middlewares/authorization";
import {postsValidation} from "../validators/posts-validator";
import {PostsService} from "../domain/posts-service";


export const postsRouter = Router({})

postsRouter.get('/', async (req: RequestWithQuery<QueryPostInputModel>, res: Response) => {
    const sortData = {
        sortBy: req.query.sortBy ?? 'createdAt',
        sortDirection: req.query.sortDirection ?? 'desc',
        pageNumber: req.query.pageNumber ? +req.query.pageNumber : 1,
        pageSize: req.query.pageSize ? +req.query.pageSize : 10
    }

    const posts = await PostsService.getAllPosts(sortData)
    res.send(posts)
})
postsRouter.get('/:id', async (req: RequestWithParams<Param>, res:Response) => {
    const post = await PostsService.getPostById(req.params.id)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.send(post)
})
postsRouter.post('/', authMiddleware, postsValidation(), async (req: RequestWithBody<PostInputModel>, res: Response) => {
    const post = await PostsService.createPost(req.body)
    res.status(201).send(post)
})
postsRouter.put('/:id', authMiddleware, postsValidation(), async (req: RequestWithParamsAndBody<Param, PostInputModel>, res: Response) => {
    const isUpdated = await PostsService.updatePost(req.params.id, req.body)
    if (!isUpdated) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})
postsRouter.delete('/:id', authMiddleware, async (req: RequestWithParams<Param>, res: Response) => {
    const isDeleted = await PostsService.deletePost(req.params.id)
    if (!isDeleted) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})