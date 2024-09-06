import {SortDirection, WithId} from "mongodb";

export type PostViewModel = {
    id: string;
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt?: string;
}

export type PostInputModel = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
}

export type PostDbModel = {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
    createdAt?: string;
}

export type QueryPostInputModel = {
    sortBy?: string
    sortDirection?: SortDirection
    pageNumber?: number
    pageSize?: number
}

export type PostInBlogInputModel = {
    title: string;
    shortDescription: string;
    content: string;
}

export type PostSortData = {
    sortBy: string
    sortDirection: SortDirection
    pageNumber: number
    pageSize: number
}


export const postMapper = (post: WithId<PostDbModel>):PostViewModel => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
    }

}
