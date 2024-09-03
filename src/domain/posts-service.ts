import {PostInputModel} from "../types/posts-types";
import {BlogsRepository} from "../repositories/blogs-repository";
import {PostsRepository} from "../repositories/posts-repository";

export class PostsService {
    static async getAllPosts(){
        return await PostsRepository.getAllPosts();
    }

    static async getPostById(id: string) {
        return await PostsRepository.getPostById(id);
    }

    static async createPost(postInput: PostInputModel){
            const blog = await BlogsRepository.getBlogById(postInput.blogId)
            if (!blog) {
                return false
            }
            const post = {
                ...postInput,
                blogName: blog.name,
                createdAt: new Date().toISOString()
            }
            return await PostsRepository.createPost(post);
    }

    static async updatePost(id: string, postInput: PostInputModel){
            return await PostsRepository.updatePost(id, postInput);
    }

    static async deletePost(id: string){
            return await PostsRepository.deletePost(id)
    }
}