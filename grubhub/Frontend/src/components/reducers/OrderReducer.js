import { FETCHORDERS,FETCHBUYERORDERS } from "../actions/action-types/ActionTypes";



const initState ={
    orders : null
}

const OrderReducer = (state = initState,action) =>{
     if(action.type === FETCHORDERS){
        return {
            ...state,
            orders : action.orders
        }
    }
    else if(action.type == FETCHBUYERORDERS){
        return {
            ...state,
            orders : action.orders
        }
    }
    return state
    
}

export default OrderReducer;