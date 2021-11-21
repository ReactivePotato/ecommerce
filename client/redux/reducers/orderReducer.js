const ORDER_BY_NAME = 'ORDER_BY_NAME'
const ORDER_BY_PRICE = 'ORDER_BY_PRICE'

const initialState = 0

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BY_NAME: {
      return {
        ...state,
        orderType: 0
      }
    }
    case ORDER_BY_PRICE: {
      return {
        ...state,
        orderType: 1
      }
    }
    default:
      return state
  }
}
