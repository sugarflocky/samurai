import {TestingRepository} from "../repositories/testing-repository";

export class TestingService {
    static async deleteAllData() {
        await TestingRepository.deleteAllData()
    }
}