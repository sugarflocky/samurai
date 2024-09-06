import {BlogInputModel, BlogSortData} from "../types/blogs-types";
import {BlogsRepository} from "../repositories/blogs-repository";
import {BlogsQueryRepository} from "../repositories/blogs-query-repository";

export class BlogsService {
    static async getAllBlogs(sortData: BlogSortData){
        return await BlogsQueryRepository.getAllBlogs(sortData);
    }

    static async getBlogById(id: string){
        return await BlogsQueryRepository.getBlogById(id);
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