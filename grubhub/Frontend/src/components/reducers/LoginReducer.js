import { LOGIN } from "../actions/action-types/ActionTypes";


const initState ={
    isAuthenticated : null
}

const LoginReducer = (state = initState,action) =>{
     if(action.type === LOGIN){
        return {
            isAuthenticated : action.loginDetails.isAuthenticated,
        }
    }
    return state
    
}

export default LoginReducer;