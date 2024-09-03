import {WithId} from "mongodb";

export type BlogViewModel = {
    id: string
    name: string
    description: string
    websiteUrl: string
    createdAt?: string
    isMembership?: boolean
}

export type BlogInputModel = {
    name: string
    description: string
    websiteUrl: string
}

export type BlogDbModel = {
    name: string
    description: string
    websiteUrl: string
    createdAt?: string
    isMembership?: boolean
}

export const blogMapper = (blog: WithId<BlogDbModel>): BlogViewModel => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}
