import {postsCollection} from "../db/db";
import {postMapper, PostSortData, PostViewModel} from "../types/posts-types";
import {ObjectId} from "mongodb";
import {Pagination} from "../types/types";
import {BlogsService} from "../domain/blogs-service";



export class PostsQueryRepository {
    static async getAllPosts(sortData: PostSortData): Promise<boolean | Pagination<PostViewModel>> {
        try {
            const {sortDirection, sortBy, pageSize, pageNumber} = sortData;
            const posts = await postsCollection
                .find({})
                .sort(sortBy, sortDirection)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray();

            const totalCount = await postsCollection.countDocuments({})
            const pagesCount = Math.ceil(totalCount / pageSize)

            return {
                pageSize,
                page: pageNumber,
                pagesCount,
                totalCount,
                items: posts.map(postMapper)
            }
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

    static async getPostsByBlogId(id: string, sortData: PostSortData){
        try {
            const blog = await BlogsService.getBlogById(id)
            if (!blog) {
                return false
            }

            const {sortDirection, sortBy, pageSize, pageNumber} = sortData;
            const posts = await postsCollection
                .find({blogId: id})
                .sort(sortBy, sortDirection)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray();

            const totalCount = await postsCollection.countDocuments({blogId: id})
            const pagesCount = Math.ceil(totalCount / pageSize)

            return {
                pageSize,
                page: pageNumber,
                pagesCount,
                totalCount,
                items: posts.map(postMapper)
            }

        } catch (e) {
            return false
        }
    }
}