import { combineReducers } from 'redux'
import ProfileReducer from './ProfileReducer'
import LoginReducer from './LoginReducer'
import ErrorReducer from './ErrorHandlerReducer'
import OrderReducer from './OrderReducer'
import SectionReducer from './SectionReducer'

export default combineReducers({
    LoginReducer,
    ProfileReducer,
    ErrorReducer,
    OrderReducer,
    SectionReducer
})