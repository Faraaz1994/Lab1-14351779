import { LOGERROR } from "../actions/action-types/ActionTypes";


const initState = {
    isError: null,
    errorText: null
}

const ErrorReducer = (state = initState, action) => {
    if (action.type === LOGERROR) {
        return {
            isError : true,
            errorText : action.error
        }
    }
    return state

}

export default ErrorReducer;