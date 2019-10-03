import {
    LOGIN, FETCHPROFILEBUYER, UPDATEPROFILEBUYER, FETCHCUISINE,
    CREATEPROFILE, LOADING, FETCHRESTURANTIMAGE, LOGERROR,
    RESOLVEERROR, FETCHORDERS, FETCHSECTION, FETCHITEMS, FETCHBUYERORDERS, FETCHRESTURANT
} from "./action-types/ActionTypes"


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
                if (response.data.error) {
                    dispatch(logError(response.data.msg))
                }
                else {
                    dispatch(resolveError())
                }

                dispatch(authenticateLoginThunkHelper({
                    isAuthenticated: response.data.error === false ? true : false,
                }));
                dispatch(fetchProfile(table));
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
                if (response.data.error) {
                    dispatch(logError(response.data.msg))
                }
                else {
                    dispatch(resolveError())
                }
                dispatch(createProfileThunkHelper(!response.data.error));
                dispatch(fetchProfile(table));

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

export const fetchOrdersThunkHelper = (orders) => {
    return {
        type: FETCHORDERS,
        orders
    }
}
export const fetchOrders = (flag) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.get('/order', {
            params: {
                flag: flag
            }
        })
            .then(function (response) {
                dispatch(fetchOrdersThunkHelper(response.data.details));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}

export const changeOrderStatus = (orderId, status) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.post('/order/changeStatus', {
            orderId,
            status
        })
            .then(function (response) {
                if (response.data.error) {
                    dispatch(logError(response.data.msg))
                }
                else {
                    dispatch(resolveError())
                }
                dispatch(fetchOrders([1,2,3]));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}

export const fetchSectionThunkHelper = (sections) => {
    return {
        type: FETCHSECTION,
        sections
    }
}
export const fetchSection = () => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.get('/merchant/section')
            .then(function (response) {
                if (response.data.error) {
                    dispatch(logError(response.data.msg))
                }
                else {
                    dispatch(resolveError())
                }
                dispatch(fetchItems(response.data.details[0].id));
                dispatch(fetchSectionThunkHelper(response.data.details));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}

export const fetchItemsThunkHelper = (items) => {
    return {
        type: FETCHITEMS,
        items
    }
}

export const fetchItems = (sectionId) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.get('/merchant/items', {
            params: {
                section: sectionId
            }
        })
            .then(function (response) {
                if (response.data.error) {
                    dispatch(logError(response.data.msg))
                }
                else {
                    dispatch(resolveError())
                }
                dispatch(fetchItemsThunkHelper(response.data.details));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}

export const addSection = (section) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.post('/merchant/section', {
            section: section
        })
            .then(function (response) {
                if (response.data.error) {
                    dispatch(logError(response.data.msg))
                }
                else {
                    dispatch(resolveError())
                }
                dispatch(fetchSection());
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}

export const removeSection = (section) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.post('/merchant/deleteSection', {
            section: section
        })
            .then(function (response) {
                if (response.data.error) {
                    dispatch(logError(response.data.msg))
                }
                else {
                    dispatch(resolveError())
                }
                dispatch(fetchSection());
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}

export const addItem = (item, section) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.post('/merchant/addItem', {
            item,
            section
        })
            .then(function (response) {
                if (response.data.error) {
                    dispatch(logError(response.data.msg))
                }
                else {
                    dispatch(resolveError())
                }
                dispatch(fetchItems(section));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}
export const updateItem = (item, section, id) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.post('/merchant/updateItem', {
            item,
            section,
            id
        })
            .then(function (response) {
                if (response.data.error) {
                    dispatch(logError(response.data.msg))
                }
                else {
                    dispatch(resolveError())
                }
                dispatch(fetchItems(section));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}
export const updateItemImage = (image, section) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.post('merchant/itemImage', image)
            .then(function (response) {
                dispatch(fetchItems(section));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}

export const deleteItem = (item, section) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.post('/merchant/deleteitem', { item: item })
            .then(function (response) {
                dispatch(fetchItems(section));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}


export const fetchBuyerOrdersThunkHelper = (orders) => {
    return {
        type: FETCHBUYERORDERS,
        orders
    }
}

export const fetchBuyerOrders = (flag) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.get('/order/buyerOrder', {
            params: {
                flag: flag
            }
        })
            .then(function (response) {
                if (response.data.error) {
                    dispatch(logError(response.data.msg))
                }
                else {
                    dispatch(resolveError())
                }
                dispatch(fetchBuyerOrdersThunkHelper(response.data.details));
            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}

export const fetchResturantThunkHelper = (resturants) => {
    return {
        type: FETCHRESTURANT,
        resturants
    }
}

export const fetchResturant = (dish, zip) => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.get('/resturant', {
            params: {
                dish: dish,
                zip: zip
            }
        })
            .then(function (response) {
                if (response.data.error) {
                    dispatch(logError(response.data.msg))
                }
                else {
                    dispatch(resolveError())
                }
                dispatch(fetchResturantThunkHelper(response.data.data));

            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}

export const fetchCuisineThunkHelper = (cuisine) => {
    return {
        type: FETCHCUISINE,
        cuisine
    }
}

export const fetchCuisine = () => {
    return (dispatch, state) => {
        dispatch(isLoading(true));
        axios.get('/resturant/cuisine')
            .then(function (response) {
                if (response.data.error) {
                    dispatch(logError(response.data.msg))
                }
                else {
                    dispatch(resolveError())
                }
                dispatch(fetchCuisineThunkHelper(response.data.data));

            })
            .catch(function (error) {
                dispatch(isLoading(false));
            });

    }
}

