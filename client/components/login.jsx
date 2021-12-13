import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateLoginField, updatePasswordField, signIn } from '../redux/reducers/auth'

export default function LoginForm() {
    const dispatch = useDispatch()
    const login = useSelector(s => s.auth.login)
    const password = useSelector(s => s.auth.password)
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <span>Username</span>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                            onChange={(event) => dispatch(updateLoginField(event.target.value))}
                            value={login}
                        />
                    </div>
                    <div className="mb-6">
                        <span>Password</span>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="******************"
                            onChange={(event) => dispatch(updatePasswordField(event.target.value))}
                            value={password}
                        />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={
                                () => { dispatch(signIn()) }
                            }
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    &copy;skillcrucial homework 5
                </p>
            </div>
        </div>
    )
}
