import { FETCHPROFILEBUYER ,UPDATEPROFILEBUYER } from "../actions/action-types/ActionTypes";
const axios = require('axios');

const initState ={
    profileDetails : null,
    updateDetails : null
}

const ProfileReducer = (state = initState,action) =>{
     if(action.type === FETCHPROFILEBUYER){
        return {
            ...state,
            profileDetails : action.profileDetails
        }
    }
     else if(action.type === UPDATEPROFILEBUYER){
        return {
            ...state,
            updateDetails : action.updateDetails
        }
    }
    return state
    
}

export default ProfileReducer;