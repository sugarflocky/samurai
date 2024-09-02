import {BlogsDB} from "../db/db";
import {BlogInputModel, BlogViewModel} from "../types/blogs-types";

export const BlogsRepository = {
    getAllBlogs(){
        return BlogsDB
              },
    getBlogById(id: string){
        const blog = BlogsDB.find(b => b.id === id)
        if (!blog) {
            return false
        }
        return blog
    },
    createBlog(blogInput: BlogInputModel){
        const blog: BlogViewModel = {
            id: new Date().toISOString(),
            ...blogInput
        }
        BlogsDB.push(blog);
        return blog
    },
    updateBlog(id: string, blogInput: BlogInputModel){
        let blog = BlogsDB.find(b => b.id === id)
        if (!blog) {
            return false
        }
        const index = BlogsDB.findIndex(b => b.id === id)
        blog = {
            id: blog.id,
            ...blogInput
        }
        BlogsDB[index] = blog
        return true
    },
    deleteBlog(id: string){
        const blogIndex = BlogsDB.findIndex(b => b.id === id)
        if (blogIndex < 0){
            return false
        }
        BlogsDB.splice(blogIndex, 1)
        return true
    }
}