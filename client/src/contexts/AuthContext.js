import axios from "axios"
import { createContext, useReducer, useEffect } from "react"
import { authReducer } from "../reducer/authReducer"
import { apiurl, LOCAL_STORAGE_TOCKEN_NAME } from "./const"
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    //authenticate user 
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOCKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOCKEN_NAME])
        }

        try {
            console.log('dd');
            const response = await axios.get(`${apiurl}/auth`)
            console.log('Cd', response);
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH', payload: {
                        isAuthenticated: true,
                        user: response.data.user
                    }
                })
            }
        } catch (err) {

            localStorage.removeItem(LOCAL_STORAGE_TOCKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH', payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    }

    useEffect(() => loadUser(), [])

    //logins 
    const loginUser = async userForm => {
        try {
            const response = await axios.post(`${apiurl}/auth/login`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOCKEN_NAME, response.data.accessToken)
            }
            await loadUser()
            return response.data
        } catch (err) {
            if (err.response.data) {
                return err.response.data
            }
            else {
                return { success: false, message: err.message }
            }
        }
    }


    //register 
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiurl}/auth/register`, userForm)
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOCKEN_NAME, response.data.accessToken)
            }
            await loadUser()
            return response.data
        } catch (err) {
            if (err.response.data) {
                return err.response.data
            }
            else {
                return { success: false, message: err.message }
            }
        }
    }

    // logout 
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOCKEN_NAME)
        dispatch({
            type: 'SET_AUTH', payload: {
                isAuthenticated: false,
                user: null
            }
        })
    }

    const authContextData = { registerUser, loginUser, authState, logoutUser }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider