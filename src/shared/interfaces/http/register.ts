import { UserInterface } from "../user";

export interface RegisterHttpParams {
    name: string
    email: string
    password: string
    phone: string
    avatarUrl?: string
}

export interface RegisterHttpResponse {
    user: UserInterface
    token: string
    refreshToken: string
}