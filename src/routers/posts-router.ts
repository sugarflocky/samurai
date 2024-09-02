import {Router} from "express";
import {Request, Response} from "express";
import {RequestWithParams, Param, RequestWithParamsAndBody, RequestWithBody} from "../types/types";
import {PostInputModel} from "../types/posts-types";
import {authMiddleware} from "../middlewares/authorization";
import {postsValidation} from "../validators/posts-validator";
import {PostsRepository} from "../repositories/posts-repository";


export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
    res.send(PostsRepository.getAllPosts())
})
postsRouter.get('/:id', (req: RequestWithParams<Param>, res:Response) => {
    const post = PostsRepository.getPostById(req.params.id)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.send(post)
})
postsRouter.post('/', authMiddleware, postsValidation(), (req: RequestWithBody<PostInputModel>, res: Response) => {
    const post = PostsRepository.createPost(req.body)
    res.status(201).send(post)
})
postsRouter.put('/:id', authMiddleware, postsValidation(), (req: RequestWithParamsAndBody<Param, PostInputModel>, res: Response) => {
    const isUpdated = PostsRepository.updatePost(req.params.id, req.body)
    if (!isUpdated) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})
postsRouter.delete('/:id', authMiddleware, (req: RequestWithParams<Param>, res: Response) => {
    const isDeleted = PostsRepository.deletePost(req.params.id)
    if (!isDeleted) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})