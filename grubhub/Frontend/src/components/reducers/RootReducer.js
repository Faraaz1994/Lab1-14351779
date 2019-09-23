import { combineReducers } from 'redux'
import ProfileReducer from './ProfileReducer'
import LoginReducer from './LoginReducer'

export default combineReducers({
    ProfileReducer,
    LoginReducer
})