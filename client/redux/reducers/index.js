import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import currency from './currencyReducer'
import currencyType from './currencyTypeReducer'
import orderReducer from './orderReducer'
import basketReducer from './basketReducer'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    currency,
    currencyType,
    orderReducer,
    basketReducer
  })

export default createRootReducer
