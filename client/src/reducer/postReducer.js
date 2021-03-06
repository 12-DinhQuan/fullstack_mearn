import { POST_LOADED_SUCCES, POST_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from '../contexts/const'

export const postReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case POST_LOADED_SUCCES:
            return {
                ...state,
                posts: payload,
                postLoading: false
            }
        case POST_LOADED_FAIL:
            return {
                ...state,
                posts: [],
                postLoading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, payload],
                postLoading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload)
            }
        case FIND_POST:
            return {
                ...state,
                post: payload
            }
        case UPDATE_POST:
            const newPost = state.posts.map(post => post._id === payload._id ? payload : post)
            return {
                ...state,
                posts: newPost
            }
        default:
            return state
    }
}