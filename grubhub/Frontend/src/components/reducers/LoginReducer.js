import { LOGIN } from "../actions/action-types/ActionTypes";
const axios = require('axios');


const initState ={
    isAuthenticated : null
}

const LoginReducer = (state = initState,action) =>{
     if(action.type === LOGIN){
        return {
            isAuthenticated : action.isAuthenticated
        }
    }
    return state
    
}

export default LoginReducer;