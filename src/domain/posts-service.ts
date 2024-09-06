import {PostInBlogInputModel, PostInputModel, PostSortData} from "../types/posts-types";
import {PostsRepository} from "../repositories/posts-repository";
import {PostsQueryRepository} from "../repositories/posts-query-repository";
import {BlogsService} from "./blogs-service";

export class PostsService {
    static async getAllPosts(sortData: PostSortData){
        return await PostsQueryRepository.getAllPosts(sortData);
    }

    static async getPostById(id: string) {
        return await PostsQueryRepository.getPostById(id);
    }

    static async createPost(postInput: PostInputModel){
        const blog = await BlogsService.getBlogById(postInput.blogId)
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

    static async getPostsByBlogId(id: string, sortData: PostSortData){
        return await PostsQueryRepository.getPostsByBlogId(id, sortData);
    }
    static async createPostInBlog(blogId: string, postInput: PostInBlogInputModel){
        const blog = await BlogsService.getBlogById(blogId)
        if (!blog) {
            return false
        }
        const post = {
            ...postInput,
            blogName: blog.name,
            blogId: blogId,
            createdAt: new Date().toISOString()
        }
        return await PostsRepository.createPost(post);
    }
}