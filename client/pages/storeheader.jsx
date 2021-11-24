import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const CURRENCY_TYPE_USD = 'CURRENCY_TYPE_USD'
const CURRENCY_TYPE_EUR = 'CURRENCY_TYPE_EUR'
const CURRENCY_TYPE_CAD = 'CURRENCY_TYPE_CAD'
const ORDER_BY_NAME = 'ORDER_BY_NAME'
const ORDER_BY_PRICE = 'ORDER_BY_PRICE'

export default function Storeheader() {
  const currentBasketState = useSelector(state => state.basketReducer)
  const currentCurrencyType = useSelector(state => state.currencyType)
  const currency = useSelector(state => state.currency)
  const dispatch = useDispatch()
  
  const getCurrentCurrency = () => {
    const currentCurrency = Object.keys(currency)[Object.values(currentCurrencyType)]
    console.log(currentCurrency)
    return currentCurrency
  }

  const getTotalCartCount = () => {
    let totalCartCount = 0
    if (currentBasketState.length === 0) {
      return 0
    } 
    currentBasketState.reduce((acc, rec) => {
      totalCartCount = acc + rec.item_amount
      return totalCartCount
    }, totalCartCount)
    return totalCartCount
  }

  const getTotalCartPrice = () => {
    let totalCartPrice = 0
    if (currentBasketState.length === 0) {
      return 0
    } 
    currentBasketState.reduce((acc, rec) => {
      totalCartPrice = acc + (+(rec.item_price) * rec.item_amount)* Object.values(currency)[Object.values(currentCurrencyType)]
      return totalCartPrice
    }, totalCartPrice)
    return totalCartPrice
  }

  const currency1 = Object.keys(currency)[Object.values(currentCurrencyType)]

  return (
    <div>
      <div
        id="brand-name"
        className="flex flex-row justify-between bg-green-700 p-6 font-mono text-gray-300 font-semibold m-1"
      >
        <div className="pt-3">
          <Link to="/">AnyBrand</Link>
        </div>
        <div id="order-count" className="order-last flex flex-row">
          <div className="mr-8 border border-dashed rounded-md pl-2 pr-2 flex flex-row pt-3 pb-3">
            <div className="transition duration-200 ease-in-out hover:bg-green-600 hover:text-gray-100">
              <button
                type="button"
                id="sort-price"
                onClick={() => {
                  dispatch({ type: ORDER_BY_PRICE })
                }}
              >
                Sort by price
              </button>
            </div>
            <span>|</span>
            <div className="transition duration-200 ease-in-out hover:bg-green-600 hover:text-gray-100">
              <button
                type="button"
                id="sort-name"
                onClick={() => {
                  dispatch({ type: ORDER_BY_NAME })
                }}
              >
                Sort by name
              </button>
            </div>
          </div>
          <div className="justify-self-end pl-2 pr-2 border border-dashed rounded-md flex flex-row pt-3 pb-3">
            <div className="transition duration-200 ease-in-out hover:bg-green-600 hover:text-gray-100">
              <button
                type="button"
                onClick={() => {
                  const currency2 = 'USD'
                  axios.post('api/v1/writelog', {
                    act: `change currency from ${currency1} to ${currency2}`,
                    time: (+new Date())
                  })
                  dispatch({ type: CURRENCY_TYPE_USD })
                }}
              >
                USD
              </button>
            </div>
            <span>|</span>
            <div className="transition duration-200 ease-in-out hover:bg-green-600 hover:text-gray-100">
              <button
                type="button"
                onClick={() => {
                  const currency2 = 'EUR'
                  axios.post('api/v1/writelog', {
                    act: `change currency from ${currency1} to ${currency2}`,
                    time: (+new Date())
                  })
                  dispatch({ type: CURRENCY_TYPE_EUR })
                }}
              >
                {' '}
                EUR{' '}
              </button>
            </div>
            <span>|</span>
            <div className="transition duration-200 ease-in-out hover:bg-green-600 hover:text-gray-100">
              <button
                type="button"
                onClick={() => {
                  const currency2 = 'CAD'
                  axios.post('api/v1/writelog', {
                    act: `change currency from ${currency1} to ${currency2}`,
                    time: (+new Date())
                  })
                  dispatch({ type: CURRENCY_TYPE_CAD })
                }}
              >
                {' '}
                CAD{' '}
              </button>
            </div>
          </div>
          <div className="relative">
          <div className="justify-self-end pr-4 border border-dashed rounded-md ml-5 font-normal">
            <div className="ml-3 transition duration-200 ease-in-out hover:bg-green-600 hover:text-gray-100 ">
              <Link to="/basket">
                <div className="ml-1">{`cart-count: ${getTotalCartCount()}`}</div>                
                <div className="ml-1">{`cart-amount: ${getCurrentCurrency()} ${getTotalCartPrice().toFixed(2)}`}</div>
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
