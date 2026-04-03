import { Platform } from "react-native";
import axios, { AxiosInstance } from "axios";

const getBaseURL = () => {
    return Platform.select({
        ios: "http://localhost:3001",
        android: "http://10.0.2.2:3001",
    })
}
const baseURL = getBaseURL();

export class MarketPlaceApiClient {
    private readonly instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({ baseURL })
    }

    getInstance(): AxiosInstance {
        return this.instance;
    }
}

export const marketPlaceApiClient: AxiosInstance = new MarketPlaceApiClient().getInstance();