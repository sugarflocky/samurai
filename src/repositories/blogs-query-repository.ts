import {blogsCollection} from "../db/db";
import {blogMapper, BlogViewModel, BlogSortData} from "../types/blogs-types";
import {ObjectId} from "mongodb";
import {Pagination} from "../types/types";


export class BlogsQueryRepository {
    static async getAllBlogs(sortData: BlogSortData): Promise<boolean | Pagination<BlogViewModel>> {
        try {
            const {sortDirection, sortBy, pageSize, pageNumber, searchNameTerm} = sortData;
            let filter = {}

            if (searchNameTerm){
                filter = {
                    name: {
                        $regex: searchNameTerm,
                        $options: "i"
                    }
                }
            }

            const blogs = await blogsCollection
                .find(filter)
                .sort(sortBy, sortDirection)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray()

            const totalCount = await blogsCollection.countDocuments(filter)
            const pagesCount = Math.ceil(totalCount / pageSize)

            return {
                pageSize,
                page: pageNumber,
                pagesCount,
                totalCount,
                items: blogs.map(blogMapper)
            }
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
}