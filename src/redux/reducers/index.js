import { combineReducers } from 'redux'
import UiReducer from './UiReducer'
import userReducer from './userReducer'
import eventTypesReducer from './eventTypesReducer'


export const rootReducer = combineReducers({
    User: userReducer,
    UI: UiReducer,
    EventTypes: eventTypesReducer
})
  