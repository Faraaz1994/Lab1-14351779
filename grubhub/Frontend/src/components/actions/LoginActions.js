import { LOGIN,FETCHPROFILEBUYER,UPDATEPROFILEBUYER } from "./action-types/ActionTypes"
const axios = require('axios');

export const authenticateLoginThunkHelper = (isAuthenticated) => {
    return {
        type: LOGIN,
        isAuthenticated 
    }
}

export const authenticateLogin = (email, pwd,table) => {
    return (dispatch, state) => {
        axios.post(table, {
            email: email,
            pwd: pwd
        })
            .then(function (response) {
                console.log(response);
                dispatch(authenticateLoginThunkHelper(response.data.error === false ? true : false));

            })
            .catch(function (error) {
                console.log(error);
                dispatch(authenticateLoginThunkHelper(false));
            });

    }
}

export const fetchProfileThunkHelper = (profileDetails) => {
    return {
        type: FETCHPROFILEBUYER,
        profileDetails 
    }
}

export const fetchProfile = (id,table) => {
    return (dispatch, state) => {
        state.isLoading = true;
        axios.get(table, {
            id: id
        })
            .then(function (response) {
                console.log(response);
                dispatch(fetchProfileThunkHelper(response.data.details));

            })
            .catch(function (error) {
                console.log(error);
                dispatch(fetchProfileThunkHelper({}));
            });

    }
}

export const updateProfileThunkHelper = (profileDetails) => {
    return {
        type: UPDATEPROFILEBUYER,
        profileDetails 
    }
}

export const updateProfile = (profileDetails,table) => {
    return (dispatch, state) => {
        axios.post(table+'/update', {
            profileDetails: profileDetails
        })
            .then(function (response) {
                console.log(response);
                dispatch(updateProfileThunkHelper(!response.data.error));

            })
            .catch(function (error) {
                console.log(error);
                dispatch(updateProfileThunkHelper(error));
            });

    }
}
