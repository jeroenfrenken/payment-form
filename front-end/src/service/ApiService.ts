import { Configuration } from '../api';
import { BaseAPI } from '../api/base';

export default class ApiService {
    private static instance: BaseAPI;

    public static getInstance(): BaseAPI {
        if (this.instance === null) {
            this.instance = new BaseAPI(new Configuration());
        }

        return this.instance;
    }
}
