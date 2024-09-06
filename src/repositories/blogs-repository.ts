import {BlogDbModel, BlogInputModel} from "../types/blogs-types";
import {ObjectId} from "mongodb";
import {BlogsService} from "../domain/blogs-service";
import {blogsCollection} from "../db/db";



export class BlogsRepository {
    static async createBlog(blog: BlogDbModel){
        try {
            const result = await blogsCollection.insertOne(blog);
            return await BlogsService.getBlogById(result.insertedId.toString())
        } catch (e) {
            return false
        }
    }

    static async updateBlog(id: string, blogInput: BlogInputModel){
        try {
            const result = await blogsCollection.updateOne({_id: new ObjectId(id)}, {
                $set: {
                    name: blogInput.name,
                    description: blogInput.description,
                    websiteUrl: blogInput.websiteUrl
                }
            })
            return !!result.matchedCount
        } catch (e) {
            return false
        }
    }

    static async deleteBlog(id: string){
        try {
            const result = await blogsCollection.deleteOne({_id: new ObjectId(id)});
            return !!result.deletedCount
        } catch (e) {
            return false
        }
    }
}