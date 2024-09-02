import {BlogsRepository} from "../repositories/blogs-repository";
import {body} from "express-validator";
import {inputModelValidation} from "../middlewares/validation";


const blogIdValidation = body('blogId')
    .isString()
    .trim()
    .custom((id:string) => {
        const blog = BlogsRepository.getBlogById(id)
        if (!blog) {
            throw new Error('Incorrect blogId')
        }
        return true
    }).withMessage('incorrect blogId')

const titleValidation = body('title')
    .isString()
    .trim()
    .isLength({min: 1, max: 30})
    .withMessage('Incorrect title length')

const shortDescriptionValidation = body('shortDescription')
    .isString()
    .trim()
    .isLength({min: 1, max: 100})
    .withMessage('Incorrect shortDescription length')

const contentValidation = body('content')
    .isString()
    .trim()
    .isLength({min:1, max:1000})
    .withMessage('Incorrect content length')

export const postsValidation = () => [blogIdValidation, titleValidation, shortDescriptionValidation, contentValidation, inputModelValidation]