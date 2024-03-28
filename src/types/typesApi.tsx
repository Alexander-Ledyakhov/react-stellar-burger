export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
}

export type TItem = {
    item: TIngredient;
    key: string;
}

type TOwner = {
    readonly name: string;
    readonly email: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}

export type TOrder = {
    ingredients?: TIngredient;
    _id?: string;
    owner?: TOwner;
    status?: string;
    name?: string;
    createdAt?: string;
    updatedAt?: string;
    number: number;
    price?: number;
}

export type TWsAllOrders = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
}[]

export type TCurrentOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
}

export type TUser = {
    readonly email: string;
    readonly password: string;
    readonly name: string;
}

export type TJson = {
    readonly success: boolean;
    readonly name: string;
    readonly order: TOrder;
    readonly message: string;
    readonly user: TUser;
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly data: TIngredient[];
    orders: TCurrentOrder;
    total: number;
    totalToday: number;
}

export type TPostTokenApi = {
    readonly success: boolean;
    readonly accessToken: string;
    readonly refreshToken: string;
}

export type TError = {
    readonly success: boolean;
    readonly message: string;
}

export type TWsAll = {
    orders: TWsAllOrders;
    success: boolean;
    total: number;
    totalToday: number;
}