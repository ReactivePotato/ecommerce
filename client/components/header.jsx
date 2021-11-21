import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Header = (props) => {
  const { userName } = useParams()
  return (
    <div className="flex items-cetner justify-between flex-wrap bg-gray-300 p-6">
      <div
        className="font-bold w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        id="user-name"
      >
        {props.username}
      </div>
      <div
        className="font-bold w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        id="repository-name"
      >
        {props.reponame}
      </div>
      <button
        type="button"
        className="shadow-l h-7 place-self-center bg-gray-500 hover:bg-gray-700 text-white font-bold content:center px-4 rounded"
      >
        <Link to="/main" className="font-bold" id="go-back">
          Go to main page
        </Link>
      </button>
      <button
        type="button"
        id="go-repository-list"
        className="shadow-l ml-3 h-7 place-self-center bg-gray-500 hover:bg-gray-700 text-white font-bold content:center px-4 rounded"
      >
        <Link to={`/${userName}`} className="font-bold" id="go-back">
          Go to repo list
        </Link>
      </button>
    </div>
  )
}

export default Header
