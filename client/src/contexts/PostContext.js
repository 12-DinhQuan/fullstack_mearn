import axios from "axios"
import { createContext, useReducer, useState } from "react"
import { postReducer } from "../reducer/postReducer"
import { apiurl, POST_LOADED_SUCCES, POST_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from "./const"


export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
    const [postStates, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true
    })

    const [showAddModal, setShowAddModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    const getPost = async () => {
        try {
            const response = await axios.get(`${apiurl}/posts`)
            if (response.data.success) {
                dispatch({
                    type: POST_LOADED_SUCCES, payload: response.data.posts
                })
            }
        } catch (err) {
            dispatch({ type: POST_LOADED_FAIL })
        }
    }

    const addPost = async newPost => {
        try {
            const response = await axios.post(`${apiurl}/posts`, newPost)
            if (response.data.success) {
                dispatch({
                    type: ADD_POST, payload: response.data.post
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiurl}/posts/${postId}`)
            if (response.data.success) {
                dispatch({ type: DELETE_POST, payload: postId })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const findPost = postId => {
        const post = postStates.posts.find(post => post._id === postId)
        dispatch({ type: FIND_POST, payload: post })

    }

    const updatePost = async (updatedPost) => {
        try {
            const response = await axios.put(`${apiurl}/posts/${updatedPost._id}`, updatedPost)
            if (response.data.success) {
                dispatch({ type: UPDATE_POST, payload: response.data.post })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }


    const postContextData = { postStates, getPost, showAddModal, setShowAddModal, showToast, setShowToast, addPost, deletePost, updatePost, findPost, showUpdateModal, setShowUpdateModal }

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider