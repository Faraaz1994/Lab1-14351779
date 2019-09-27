import { FETCHPROFILEBUYER, UPDATEPROFILEBUYER, CREATEPROFILE, LOADING, FETCHRESTURANTIMAGE } from "../actions/action-types/ActionTypes";


const initState = {
    profileDetails: null,
    isLoading: null,
    resturantImages: null,
    isAccountCreated: null,
}

const ProfileReducer = (state = initState, action) => {
    if (action.type === FETCHPROFILEBUYER) {
        return {
            ...state,
            isLoading: false,
            profileDetails: action.profileDetails
        }
    }
    else if (action.type === UPDATEPROFILEBUYER) {
        return {
            ...state,
            isLoading: false
        }
    }
    else if (action.type === CREATEPROFILE) {
        return {
            ...state,
            isLoading: false,
            isAccountCreated: action.isAccountCreated
        }

    }
    else if (action.type === LOADING) {
        return {
            ...state,
            isLoading: action.isLoading
        }
    }
    else if (action.type === FETCHRESTURANTIMAGE) {
        return {
            ...state,
            isLoading: false,
            resturantImages: action.resturantImages
        }
    }
    return state

}

export default ProfileReducer;