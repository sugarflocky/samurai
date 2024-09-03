import {Request, Response, Router} from "express";
import {TestingRepository} from "../repositories/testing-repository";

export const testingRouter = Router({})

testingRouter.delete('/', async (req: Request, res: Response) => {
    await TestingRepository.deleteAllData()
    res.statusMessage = "All data is deleted"
    res.status(204).end()
})


