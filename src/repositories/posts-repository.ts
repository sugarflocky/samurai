import {PostInputModel, postMapper} from "../types/posts-types";
import {BlogsRepository} from "./blogs-repository";
import {postsCollection} from "../db/db";
import {ObjectId} from "mongodb";


export class PostsRepository {
    static async getAllPosts(){
        try {
            const posts = await postsCollection.find({}).toArray();
            return posts.map(postMapper)
        } catch (e) {
            return false
        }
    }

    static async getPostById(id: string) {
        try {
            const post = await postsCollection.findOne({_id: new ObjectId(id)})
            if (!post) {
                return false
            }
            return postMapper(post);
        } catch (e) {
            return false
        }
    }

    static async createPost(postInput: PostInputModel){
        try {
            const blog = await BlogsRepository.getBlogById(postInput.blogId)
            if (!blog) {
                return false
            }
            const post = {
                ...postInput,
                blogName: blog.name,
                createdAt: new Date().toISOString()
            }
            const result = await postsCollection.insertOne(post);
            return this.getPostById(result.insertedId.toString())
        } catch (e) {
            return false
        }
    }

    static async updatePost(id: string, postInput: PostInputModel){
        try {
            const blog = await BlogsRepository.getBlogById(postInput.blogId)
            const post = this.getPostById(id)
            if (!blog || !post) {
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
            const post = this.getPostById(id.toString());
            if (!post) {
                return false
            }
            await postsCollection.deleteOne({_id: new ObjectId(id)})
            return true
        } catch (e) {
            return false
        }
    }
}