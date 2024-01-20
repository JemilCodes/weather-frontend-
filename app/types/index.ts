export interface TAuthForm {
    email: string;
    password: string;
}

export interface TRegisterForm {
    password: string;
    password_confirmation: string;
    email: string;
}

export interface TAuthData {
    access_token: string;
    user: User;
}
export type User = {
    id: string;
    email: string;
}
export type AuthServiceType = {
    login: (data: TAuthForm) => Promise<void>;
    signup: (data: TRegisterForm)=> Promise<void>;
}