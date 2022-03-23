export const apiurl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'somedeployedURL'

export const LOCAL_STORAGE_TOCKEN_NAME = 'learnit'

export const POST_LOADED_SUCCES = 'POST_LOADED_SUCCES'
export const POST_LOADED_FAIL = 'POST_LOADED_FAIL'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const FIND_POST = 'FIND_POST'