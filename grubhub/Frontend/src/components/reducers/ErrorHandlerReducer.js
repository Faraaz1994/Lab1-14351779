import { LOGERROR, RESOLVEERROR } from "../actions/action-types/ActionTypes";


const initState = {
    isError: null,
    errorText: null
}

const ErrorReducer = (state = initState, action) => {
    if (action.type === LOGERROR) {
        return {
            isError: true,
            errorText: action.error
        }
    }
    else if (action.type === RESOLVEERROR) {
        return {
            isError: false,
            errorText: null
        }

    }
    return state

}

export default ErrorReducer;