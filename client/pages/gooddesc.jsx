import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const ADD_GOOD_TO_BASKET = 'ADD_GOOD_TO_BASKET'

export default function Gooddesc({ list }) {
  const currency = useSelector((store) => store.currency)
  const currencyType = useSelector((store) => store.currencyType)
  const currentOrder = useSelector((store) => store.orderReducer.orderType)
  const currentItemAmount = useSelector((store) => store.basketReducer)
  const dispatch = useDispatch()

  if (currentOrder === 0) {
    list.sort((a, b) => (a.title < b.title ? -1 : 1))
  }

  if (currentOrder === 1) {
    list.sort((a, b) => (a.price < b.price ? -1 : 1))
  }

  return list.map((item, idx) => {
    return (
      <div className="m-3 card border border-black bg-green-100 p-3 shadow-lg rounded-md w-40 h-120" key={idx}>
          <div className=".card__title h-5 pl-1 pb-12 font-bold">{item.title}</div>
          <div className=".card__image border-gray-400 rounded-md ">
            <img className="h-32 w-32" src={item.image} alt="img" />
          </div>
          <div className="mt-1">
            <div className=".card__price">
              {(+(Object.values(currency)[Object.values(currencyType)] * item.price)).toFixed(2)}
            </div>
            <div className=".currency">{Object.keys(currency)[Object.values(currencyType)]}</div>
          </div>
          <div className="pt-0 pb-1"><div className=".card__product-amount absolute justify-center">
            {currentItemAmount.map((it) => {
              if (it.item_id === item.id) {
                return <div>{`In cart: ${it.item_amount}`}</div>
              }
              return ''
            })}
          </div>
          </div>
          <div className="pt-10">
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: ADD_GOOD_TO_BASKET,
                  payload: {
                    item_title: item.title,
                    item_image: item.image,
                    item_id: item.id,
                    item_price: (+(
                      Object.values(currency)[Object.values(currencyType)] * item.price
                    )).toFixed(2),
                    item_currency: Object.keys(currency)[Object.values(currencyType)],
                    item_amount: 1
                  }
                })
              }
            >
              <div className="border border-gray-400 p-2 rounded-md transition duration-300 ease-in-out hover:bg-green-300 mt-3 shadow-lg">
                Add to cart
              </div>
            </button>
          </div>
          </div>
      </div>
    )
  })
}
