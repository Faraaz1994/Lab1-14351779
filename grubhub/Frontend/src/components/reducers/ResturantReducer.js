import { FETCHRESTURANT,FETCHCUISINE } from "../actions/action-types/ActionTypes";



const initState = {
    resturants: null,
    cuisine : null
}

const ResturantReducer = (state = initState, action) => {
    if (action.type === FETCHRESTURANT) {
        return {
            ...state,
            resturants: action.resturants
        }
    }
    else if (action.type === FETCHCUISINE) {
        return {
            ...state,
            cuisine: action.cuisine
        }
    }
    return state

}

export default ResturantReducer;