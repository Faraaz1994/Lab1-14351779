import { combineReducers } from 'redux'
import ProfileReducer from './ProfileReducer'
import LoginReducer from './LoginReducer'
import ErrorReducer from './ErrorHandlerReducer'

export default combineReducers({
    LoginReducer,
    ProfileReducer,
    ErrorReducer
})