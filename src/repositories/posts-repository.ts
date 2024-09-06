import {PostDbModel, PostInputModel} from "../types/posts-types";
import {postsCollection} from "../db/db";
import {ObjectId} from "mongodb";
import {BlogsService} from "../domain/blogs-service";
import {PostsService} from "../domain/posts-service";


export class PostsRepository {
    static async createPost(post: PostDbModel){
        try {
            const result = await postsCollection.insertOne(post);
            return await PostsService.getPostById(result.insertedId.toString())
        } catch (e) {
            return false
        }
    }

    static async updatePost(id: string, postInput: PostInputModel){
        try {
            const blog = await BlogsService.getBlogById(postInput.blogId)
            if (!blog){
                return false
            }
            await postsCollection.updateOne({_id: new ObjectId(id)}, {
                $set: {
                    title: postInput.title,
                    shortDescription: postInput.shortDescription,
                    content: postInput.content,
                    blogId: postInput.blogId,
                    blogName: blog.name
                }
            })
            return true
        } catch (e) {
            return false
        }
    }

    static async deletePost(id: string){
        try {
            await postsCollection.deleteOne({_id: new ObjectId(id)})
            return true
        } catch (e) {
            return false
        }
    }

    static async createPostInBlog(id: string, post: PostDbModel){
        try {
            const blog = await BlogsService.getBlogById(id)
            if (!blog){
                return false
            }
            const result = await postsCollection.insertOne(post);
            return await PostsService.getPostById(result.insertedId.toString())
        } catch (e) {
            return false
        }
    }

}