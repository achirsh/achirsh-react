import { combineReducers } from "redux"
import * as Reducers from "redux/reducers"

export  const reducers = combineReducers({
    ...Reducers.Area,
    ...Reducers.Situation,
    ...Reducers.Device,
    ...Reducers.Map,
    ...Reducers.Panel
})
