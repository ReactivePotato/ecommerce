import React, { useState } from 'react'
import Head from './head'
import { history } from '../redux'

const MainPage = (props) => {
  const [userName, setUserName] = useState('write name here')

  return (
    <div className="m-5 box h-30 w-60 p-1 border-2 rounded border-gray-500 bg-gray-300 shadow-xl">
      <Head title="Main Page" />
      <div className="mb-1 flex justify-center font-bold">go to:</div>
      <input id="input-field"
        type="text"
        onChange={(event) => setUserName(event.target.value)}
        value={userName}
        className="rounded border-3 border-gray-500 p-1 shadow h-7 w-full"
      />

      <div className="flex justify-center">
        <button id="search-button"
          type="button"
          onClick={() => {
            props.onClickEvent(userName)
            history.push(`/${userName}`)
          }}
          className="shadow-l mb-1 h-8 place-self-center bg-gray-500 hover:bg-gray-700 text-white font-bold mt-2 py-1 content:center px-4 rounded"
        >
          search
        </button>
      </div>
    </div>
  )
}

MainPage.propTypes = {}

export default React.memo(MainPage)
