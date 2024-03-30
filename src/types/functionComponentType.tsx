import { ReactElement, ReactNode } from "react";
import { TIngredient, TItem } from "./typesApi";

export type TOnClose = {
    onClose: () => void;
}

export type TElement = {
    element: ReactElement;
}

export type TChildren = {
    children: ReactNode;
}

export type TModal = TOnClose & TChildren
export type TProfilePage = TOnClose & TElement 

export type TOrderCard = {
    order: {
        readonly createdAt: string;
        readonly ingredients: string[];
        readonly name: string;
        readonly number: number;
        readonly status: string;
        readonly updatedAt: string;
        readonly _id: string;
    };
    link: string
}

export type TBurgerConstructor = {
    ingredient: TItem;
    index: number;
}

export type TIconIngredients = {
    ingredients: TIngredient;
    index: number;
    allIndex: number;
}

export type TBurgerIngredient = {
    itemContent: TIngredient;
}

export type TFeedIngredientDetails = {
    ingredientsItems: TIngredient[];
    ingredientsObj: any;
}

export type TIconFeed = {
    image: string;
    name: string;
}

export type TwsActions = {
    wsInitAuth: string;
    wsInit: string;
    wsClose: string;
    wsOpen: string;
    wsError: string;
    wsMessage: string;
};