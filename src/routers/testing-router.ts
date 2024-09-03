import {Request, Response, Router} from "express";
import {TestingService} from "../domain/testing-service";

export const testingRouter = Router({})

testingRouter.delete('/', async (req: Request, res: Response) => {
    await TestingService.deleteAllData()
    res.statusMessage = "All data is deleted"
    res.status(204).end()
})


