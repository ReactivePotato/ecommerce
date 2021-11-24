import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Storeheader from './storeheader'


const REMOVE_GOOD_FROM_BASKET = 'REMOVE_GOOD_FROM_BASKET'

export default function Basket() {
  const dispatch = useDispatch()
  const itemsInBasket = useSelector((state) => state.basketReducer)
  const currency = useSelector((store) => store.currency)
  const currencyType = useSelector((store) => store.currencyType)
  const url = 'basket'

  const getTotalAmount = (items) => {
    return items.reduce((acc, rec) => {
      const oneItemPrice = (
        Object.values(currency)[Object.values(currencyType)] *
        rec.item_price *
        rec.item_amount
      ).toFixed(2)
      return acc + +oneItemPrice
    }, 0)
  }

  axios.post('api/v1/writelog', {
    act: `navigate to ${url} page`,
    time: +new Date()
  })

  return (
    <div>
      <Storeheader />
      <div className="flex m-2 font-mono m-1">Items in basket</div>
      <div className="flex m-2 font-mono">
        <table className="table-auto border-collapse border-border-green-800">
          <thead>
            <tr>
              <th className="border border-green-600 pl-1 pr-1">Item in basket</th>
              <th className="border border-green-600 pl-1 pr-1">Price</th>
              <th className="border border-green-600 pl-1 pr-1">Amount in basket</th>
              <th className="border border-green-600 pl-1 pr-1">Total price</th>
              <th className="border border-green-600 pl-1 pr-1">Remove item</th>
            </tr>
          </thead>
          <tbody>
            {itemsInBasket.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="border border-green-600 pl-1 pr-1">
                    <div className="product__title">{item.item_title}</div>
                    <div className="product__image">
                      <img className="h-32 w-32 mb-1" src={item.item_image} alt="img" />
                    </div>
                    <div className="product__id">{item.item_id}</div>
                  </td>
                  <td className="border border-green-600 pl-1 pr-1">
                    <div className="product__price">
                      {(+(
                        Object.values(currency)[Object.values(currencyType)] * item.item_price
                      )).toFixed(2)}
                    </div>
                  </td>
                  <td className="border border-green-600 pl-1 pr-1">
                    <div className="product__amount">{item.item_amount}</div>
                  </td>
                  <td className="border border-green-600 pl-1 pr-1">
                    <div className="product__total_price">
                      {(
                        Object.values(currency)[Object.values(currencyType)] *
                        item.item_price *
                        item.item_amount
                      ).toFixed(2)}
                    </div>
                  </td>
                  <td className="border border-green-600 pl-1 pr-1">
                    <div className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => {
                          axios.post('api/v1/writelog', {
                            act: `remove ${item.item_title} from the backet`,
                            time: +new Date()
                          })
                          dispatch({
                            type: REMOVE_GOOD_FROM_BASKET,
                            payload: {
                              item_title: item.item_title,
                              item_image: item.item_image,
                              item_id: item.item_id,
                              item_price: (+(
                                Object.values(currency)[Object.values(currencyType)] *
                                item.item_price
                              )).toFixed(2),
                              item_currency: Object.keys(currency)[Object.values(currencyType)],
                              item_amount: 1
                            }
                          })
                        }}
                      >
                        <div className="border border-black pl-2 pr-2 rounded-md transition duration-300 ease-in-out hover:bg-green-300 shadow-lg">
                          -
                        </div>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-row ml-3" id="total-amount">
        <div>Total price: {Object.keys(currency)[Object.values(currencyType)]}</div>
        <div className="ml-1">{getTotalAmount(itemsInBasket).toFixed(2)}</div>
      </div>
    </div>
  )
}
