import {Router} from "express";
import {Request, Response} from "express";
import {RequestWithParams, Param, RequestWithParamsAndBody, RequestWithBody} from "../types/types";
import {PostInputModel} from "../types/posts-types";
import {authMiddleware} from "../middlewares/authorization";
import {postsValidation} from "../validators/posts-validator";
import {PostsRepository} from "../repositories/posts-repository";


export const postsRouter = Router({})

postsRouter.get('/', async (req: Request, res: Response) => {
    const posts = await PostsRepository.getAllPosts()
    res.send(posts)
})
postsRouter.get('/:id', async (req: RequestWithParams<Param>, res:Response) => {
    const post = await PostsRepository.getPostById(req.params.id)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.send(post)
})
postsRouter.post('/', authMiddleware, postsValidation(), async (req: RequestWithBody<PostInputModel>, res: Response) => {
    const post = await PostsRepository.createPost(req.body)
    res.status(201).send(post)
})
postsRouter.put('/:id', authMiddleware, postsValidation(), async (req: RequestWithParamsAndBody<Param, PostInputModel>, res: Response) => {
    const isUpdated = await PostsRepository.updatePost(req.params.id, req.body)
    if (!isUpdated) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})
postsRouter.delete('/:id', authMiddleware, async (req: RequestWithParams<Param>, res: Response) => {
    const isDeleted = await PostsRepository.deletePost(req.params.id)
    if (!isDeleted) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})