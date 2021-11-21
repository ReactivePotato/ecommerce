const CURRENCY_TYPE_USD = 'CURRENCY_TYPE_USD'
const CURRENCY_TYPE_EUR = 'CURRENCY_TYPE_EUR'
const CURRENCY_TYPE_CAD = 'CURRENCY_TYPE_CAD'

const initialState = 0

export default (state = initialState, action) => {
  switch (action.type) {
    case CURRENCY_TYPE_USD: {
      return {
        ...state,
        currencyType: 0
      }
    }
    case CURRENCY_TYPE_CAD: {
      return {
        ...state,
        currencyType: 1
      }
    }
    case CURRENCY_TYPE_EUR: {
      return {
        ...state,
        currencyType: 2
      }
    }
    default:
      return state
  }
}
