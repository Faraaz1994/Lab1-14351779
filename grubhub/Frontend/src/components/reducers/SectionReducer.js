import { FETCHSECTION ,FETCHITEMS} from "../actions/action-types/ActionTypes";


const initState = {
    sections: null,
    items : null
}

const SectionReducer = (state = initState, action) => {
    if (action.type === FETCHSECTION) {
        return {
            ...state,
            sections: action.sections
        }
    }
    else if (action.type === FETCHITEMS) {
        return {
            ...state,
            items: action.items
        }
    }
    return state
}

export default SectionReducer;