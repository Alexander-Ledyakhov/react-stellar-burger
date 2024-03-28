export const MODAL_CLOSE: 'MODAL_CLOSE' = 'MODAL_CLOSE'
export const MODAL_OPEN: 'MODAL_OPEN' = 'MODAL_OPEN'

export interface IModalCloseAction {
    readonly type: typeof MODAL_CLOSE;
}

export interface IModalOpenAction {
    readonly type: typeof MODAL_OPEN;
    readonly payload: {
        type: string;
        title: string;
    }
}
  
export type TTodoActions = 
    | IModalCloseAction
    | IModalOpenAction