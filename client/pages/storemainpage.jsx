import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'

import Storeheader from './storeheader'
import Gooddesc from './gooddesc'

const SET_CURRENCY = 'SET_CURRENCY'
const CURRENCY_TYPE_USD = 'CURRENCY_TYPE_USD'

export default function Storemainpage() {
  const dispatch = useDispatch()
  const currentStore = useSelector((store) => store)
  const [list, setList] = useState([])
  const url = 'main'
  const cookies = new Cookies()

  const getGoods = () => {
    return axios.get('/api/v1/goods').then(({ data }) => {
      setList(data)
    })
  }

  const getCurrency = async () => {
    await axios.get('/api/v1/currency').then(({ data }) => {
      dispatch({
        type: SET_CURRENCY,
        payload: data.rates
      })
    })
  }

  useEffect(async () => {
    dispatch({ type: CURRENCY_TYPE_USD })
    await getCurrency()
    await getGoods()
    await axios.post('api/v1/writelog', {
      act: `navigate to ${url} page`,
      time: +new Date()
    })
    cookies.set('start-date', new Date().toString(), { path: '/' })
    fetch('/api/v1/test/cookies')
  }, currentStore)

  return (
    <div>
      <Storeheader />
      <div className="flex flex-wrap">
        <Gooddesc list={list.slice(-10)} />
      </div>
    </div>
  )
}
