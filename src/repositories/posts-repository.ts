import {PostsDB} from "../db/db";
import {PostInputModel} from "../types/posts-types";
import {BlogsRepository} from "./blogs-repository";


export const PostsRepository = {
    getAllPosts() {
        return PostsDB;
    },
    getPostById(id: string) {
        const post = PostsDB.find(p => p.id === id);
        if (!post) {
            return false
        }
        return post;
    },
    createPost(postInput: PostInputModel) {
        const blog = BlogsRepository.getBlogById(postInput.blogId)
        if (!blog) {
            return false
        }
        const post = {
            id: new Date().toISOString(),
            ...postInput,
            blogName: blog.name,
        }
        PostsDB.push(post);
        return post
    },
    updatePost(id: string, postInput: PostInputModel) {
        const blog = BlogsRepository.getBlogById(postInput.blogId);
        let post = PostsDB.find(p => p.id === id);
        const index = PostsDB.findIndex(p => p.id === id)
        if (!post || !blog || index < 0) {
            return false
        }
        post = {
            id: post.id,
            ...postInput,
            blogName: blog.name
        }
        PostsDB[index] = post;
        return true
    },
    deletePost(id: string) {
        const index = PostsDB.findIndex(p => p.id === id);
        if (index < 0) {
            return false
        }
        PostsDB.splice(index, 1)
        return true
    }
}