import { LOGIN, FETCHPROFILEBUYER, UPDATEPROFILEBUYER, 
        CREATEPROFILE, LOADING,FETCHRESTURANTIMAGE ,LOGERROR,
        RESOLVEERROR} from "./action-types/ActionTypes"


const axios = require('axios');

export const logError = (error) => {
    return {
        type: LOGERROR,
        error
    }
}
export const resolveError = (error) => {
    return {
        type: RESOLVEERROR,
        error
    }
}
export const authenticateLoginThunkHelper = (loginDetails) => {
    return {
        type: LOGIN,
        loginDetails
    }
}

export const authenticateLogin = (email, pwd, table) => {
    return (dispatch, state) => {
        axios.post(table, {
            email: email,
            pwd: pwd
        })
            .then(function (response) {
                if(response.data.error){
                    dispatch(logError(response.data.msg))
                }
                else{
                    dispatch(resolveError())
                }
                
                dispatch(authenticateLoginThunkHelper({
                    isAuthenticated: response.data.error === false ? true : false,
                    full_name: response.data.details[0].full_name || response.data.details[0].merchant_name
                }));

            })
            .catch(function (error) {
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

export const fetchProfile = (table) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.get(table)
            .then(function (response) {
                dispatch(fetchProfileThunkHelper(response.data.details));

            })
            .catch(function (error) {
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

export const updateProfile = (profileDetails, table) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.post(table + '/update', {
            profileDetails: profileDetails
        })
            .then(function (response) {
                if (response.data.error == false)
                    dispatch(fetchProfile(table));
                else
                    dispatch(isLoading(false));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}

export const createProfileThunkHelper = (isAccountCreated) => {
    return {
        type: CREATEPROFILE,
        isAccountCreated
    }
}

export const createProfile = (profileDetails, table) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.post(table + '/signup', {
            profileDetails
        })
            .then(function (response) {
                dispatch(createProfileThunkHelper(!response.data.error));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}


export const updateImage = (image, table) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.post(table + '/profilePic', image)
            .then(function (response) {
                dispatch(fetchProfile(table));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}
//TODO fetch resturant images
export const updateResturantImage = (images) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.post('/merchant/resturantImages', images)
            .then(function (response) {
                dispatch(fetchResturantImages());
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}


export const fetchResturantImagesThunkHelper = (resturantImages) => {
    return {
        type: FETCHRESTURANTIMAGE,
        resturantImages
    }
}
export const fetchResturantImages = () => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.get('/merchant/resturantImages')
            .then(function (response) {
                    dispatch(fetchResturantImagesThunkHelper(response.data.details));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}




export const isLoading = (isLoading) => {
    return {
        type: LOADING,
        isLoading
    }
}


