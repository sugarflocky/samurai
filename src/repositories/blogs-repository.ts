import {blogsCollection} from "../db/db";
import {BlogDbModel, BlogInputModel, blogMapper} from "../types/blogs-types";
import {ObjectId} from "mongodb";

export class BlogsRepository {
    static async getAllBlogs(){
        try {
            const blogs = await blogsCollection.find({}).toArray();
            return blogs.map(blogMapper)
        } catch (e) {
            return false
        }
    }

    static async getBlogById(id: string){
        try {
            const blog = await blogsCollection.findOne({_id: new ObjectId(id)});
            if (!blog) {
                return false
            }
            return blogMapper(blog)
        } catch (e) {
            return false
        }
    }

    static async createBlog(blog: BlogDbModel){
        try {
            const result = await blogsCollection.insertOne(blog);
            return this.getBlogById(result.insertedId.toString())
        } catch (e) {
            return false
        }
    }

    static async updateBlog(id: string, blogInput: BlogInputModel){
        try {
            let blog = await this.getBlogById(id.toString());
            if (!blog) {
                return false
            }
            await blogsCollection.updateOne({_id: new ObjectId(id)}, {
                $set: {
                    name: blogInput.name,
                    description: blogInput.description,
                    websiteUrl: blogInput.websiteUrl
                }
            })
            return true
        } catch (e) {
            return false
        }
    }

    static async deleteBlog(id: string): Promise<boolean>{
        try {
            const blog = await this.getBlogById(id.toString());
            if (!blog) {
                return false
            }
            await blogsCollection.deleteOne({_id: new ObjectId(id)});
            return true
        } catch (e) {
            return false
        }
    }
}