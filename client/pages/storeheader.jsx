import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const CURRENCY_TYPE_USD = 'CURRENCY_TYPE_USD'
const CURRENCY_TYPE_EUR = 'CURRENCY_TYPE_EUR'
const CURRENCY_TYPE_CAD = 'CURRENCY_TYPE_CAD'
const ORDER_BY_NAME = 'ORDER_BY_NAME'
const ORDER_BY_PRICE = 'ORDER_BY_PRICE'

export default function Storeheader() {
  const dispatch = useDispatch()
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
                  dispatch({ type: CURRENCY_TYPE_CAD })
                }}
              >
                {' '}
                CAD{' '}
              </button>
            </div>
          </div>
          <div className="justify-self-end pr-2 border border-dashed rounded-md ml-5 flex flex-row font-normal">
          <div className="ml-3 transition duration-200 ease-in-out hover:bg-green-600 hover:text-gray-100"><Link to="/basket">
          <div className="ml-1">cart-count: 3</div>
          <div className="ml-1">cart-amount: $500</div>
          </Link></div>
          </div>
        </div>
      </div>
    </div>
  )
}
