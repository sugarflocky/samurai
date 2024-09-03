import {WithId} from "mongodb";

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
