import {BlogsDB, PostsDB} from "../db/db";

export class TestingRepository {
    static deleteAllData() {
        BlogsDB.length = 0
        PostsDB.length = 0
    }
}