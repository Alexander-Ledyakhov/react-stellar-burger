import { TItem } from "../../types/typesApi";

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';

export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';

export const CHANGE_ORDER_INGREDIENT: 'CHANGE_ORDER_INGREDIENT' = 'CHANGE_ORDER_INGREDIENT';


export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: TItem;
}
  
export interface IAddBunAction {
    readonly type: typeof ADD_BUN;
    readonly payload: TItem;
}

export interface IRemoveIngredientAction {
    readonly type: typeof REMOVE_INGREDIENT;
    readonly payload: {
        item: string;
    };
}

export interface IChangeOrderIngredientAction {
    readonly type: typeof CHANGE_ORDER_INGREDIENT;
    readonly payload: {
        dragIndex: number;
        hoverIndex: number;
    };
}
  
export type TTodoActionsAddIngredient = 
    | IAddIngredientAction
    | IAddBunAction
    | IRemoveIngredientAction
    | IChangeOrderIngredientAction