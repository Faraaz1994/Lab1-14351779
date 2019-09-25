import { LOGIN } from "../actions/action-types/ActionTypes";


const initState ={
    isAuthenticated : null,
    full_name : null
}

const LoginReducer = (state = initState,action) =>{
     if(action.type === LOGIN){
        return {
            isAuthenticated : action.loginDetails.isAuthenticated,
            full_name : action.loginDetails.full_name
        }
    }
    return state
    
}

export default LoginReducer;