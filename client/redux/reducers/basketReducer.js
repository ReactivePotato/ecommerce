const ADD_GOOD_TO_BASKET = 'ADD_GOOD_TO_BASKET'
const REMOVE_GOOD_FROM_BASKET = 'REMOVE_GOOD_FROM_BASKET'

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_GOOD_TO_BASKET: {
            const foundedItem = state.find((item) => item.item_id === action.payload.item_id)

            if (typeof foundedItem !== 'undefined') {
                return state.map((item) => {
                    if (item.item_id === action.payload.item_id) {
                        return { ...item, item_amount: item.item_amount + 1 }
                    } return item
                })
            } return [...state, action.payload]
        }
        case REMOVE_GOOD_FROM_BASKET: {
                return state.map((item) => {
                    if (item.item_id === action.payload.item_id) {
                        return { ...item, item_amount: item.item_amount - 1 }
                    } 
                    return item
                }) 
            } 
        default:
            return state
    }
}


