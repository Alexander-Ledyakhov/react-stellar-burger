import { 
    MODAL_CLOSE, 
    MODAL_OPEN,
    TTodoActions
} from "../actions/modal"

type TTodoListState = {
    visible: boolean;
    type: string;
    title: string;
}
  
const initialState: TTodoListState = {
    visible: false, 
    type: '',
    title: ''
}

export function modalReducer(state = initialState, action: TTodoActions) {

    switch (action.type) {
        case MODAL_CLOSE:
            localStorage.removeItem('modalOpen');
            return {
                ...state, 
                visible: false, 
                type: '', 
                title: ''
            }

        case MODAL_OPEN:
            localStorage.setItem('modalOpen', 'true');
            return {
                ...state, 
                visible: true, 
                type: action.payload.type, 
                title: action.payload.title
            }

        default:
            return state;
    }
}