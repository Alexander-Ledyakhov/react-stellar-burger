import { 
    MODAL_CLOSE, 
    MODAL_OPEN 
} from "../actions/modal"

const initialState = {
    visible: false, 
    type: '',
    title: '',
    item: {}
}

export function modalReducer(state = initialState, action) {

    switch (action.type) {
        case MODAL_CLOSE:
            return {
                ...state, 
                visible: false, 
                type: '', 
                title: '',
                item: {}
            }

        case MODAL_OPEN:
            return {
                ...state, 
                visible: true, 
                type: action.payload.type, 
                title: action.payload.title,
                item: action.payload.info
            }

        default:
            return state;
    }
}