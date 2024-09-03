import {BlogDbModel} from "../types/blogs-types";
import {PostDbModel} from "../types/posts-types";
import {MongoClient} from "mongodb";

const url = process.env.MONGO_URL || "mongodb+srv://admin:admin@samurai.sjcfk.mongodb.net/?retryWrites=true&w=majority&appName=samurai"
console.log('url:',url)
const client = new MongoClient(url);

export const blogsCollection = client.db().collection<BlogDbModel>('blogs');
export const postsCollection = client.db().collection<PostDbModel>('posts');

export const runDb = async () => {
    try {
        await client.connect()
        console.log('Connected to DB')
    } catch (e) {
        console.log('Cant connect to DB')
        await client.close()
    }
}