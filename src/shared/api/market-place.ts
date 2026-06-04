import { Platform } from "react-native";
import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getBaseURL = () => {
    return Platform.select({
        ios: "http://localhost:3001",
        android: "http://10.0.2.2:3001",
    })
}
export const baseURL = getBaseURL();

export class MarketPlaceApiClient {
    private readonly instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({ baseURL });
        this.setupInterceptors();
    }

    getInstance(): AxiosInstance {
        return this.instance;
    }

    private setupInterceptors() {
        this.instance.interceptors.request.use(async (config) => {
            const userData = await AsyncStorage.getItem("marketplace-auth");
            if (userData) {
                const { state: { token } } = JSON.parse(userData);
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        });
    }
}

export const marketPlaceApiClient: AxiosInstance = new MarketPlaceApiClient().getInstance();