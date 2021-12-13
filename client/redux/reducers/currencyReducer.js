const SET_CURRENCY = 'SET_CURRENCY'

const initialState = {
  USD: 0,
  CAD: 0,
  EUR: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENCY: {
      return {
        ...state,
        USD: action.payload.USD,
        CAD: action.payload.CAD,
        EUR: action.payload.EUR
      }
    }
    default:
      return state
  }
}
