import {BlogInputModel} from "../types/blogs-types";
import {BlogsRepository} from "../repositories/blogs-repository";

export class BlogsService {
    static async getAllBlogs(){
        return await BlogsRepository.getAllBlogs();
    }

    static async getBlogById(id: string){
        return await BlogsRepository.getBlogById(id);
    }

    static async createBlog(blogInput: BlogInputModel){
        const blog = {
            ...blogInput,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        return await BlogsRepository.createBlog(blog);
    }

    static async updateBlog(id: string, blogInput: BlogInputModel){
        return await BlogsRepository.updateBlog(id, blogInput);
    }

    static async deleteBlog(id: string): Promise<boolean>{
        return await BlogsRepository.deleteBlog(id);
    }
}