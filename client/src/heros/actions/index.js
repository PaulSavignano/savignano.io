import { SubmissionError } from 'redux-form'

export const type = 'HERO'
const route = 'heros'
const fetchMethod = 'Heros'

const ADD = `ADD_${type}`
const REQUEST = `REQUEST_${type}S`
const RECEIVE = `RECEIVE_${type}S`
const UPDATE = `UPDATE_${type}`
const DELETE = `DELETE_${type}`
const ERROR = `ERROR_${type}`

// Create
const fetchAddSuccess = (item) => ({ type: ADD, item })
const fetchAddFailure = (error) => ({ type: ERROR, error })
export const fetchAdd = (add) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(add)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchAddSuccess(json))
      })
      .catch(err => {
        dispatch(fetchAddFailure(err))
        throw new SubmissionError({ error: err.error, _error: err.error })
    })
  }
}



// Read
const fetchHerosRequest = () => ({ type: REQUEST })
const fetchHerosSuccess = (items) => ({ type: RECEIVE, items })
const fetchHerosFailure = (error) => ({ type: ERROR, error })
export const fetchHeros = () => {
  console.log('fetching Heros')
  return (dispatch, getState) => {
    dispatch(fetchHerosRequest())
    return fetch(`/api/${route}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log('heros', json)
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchHerosSuccess(json))
      })
      .catch(err => {
        console.log(err)
        dispatch(fetchHerosFailure(err))
      })
  }
}



// Update
const fetchUpdateSuccess = (item) => ({ type: UPDATE, item })
const fetchUpdateFailure = (error) => ({ type: ERROR, error })
export const fetchUpdate = (_id, update) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        console.log(json)
        dispatch(fetchUpdateSuccess(json))
      })
      .catch(err => {
        dispatch(fetchUpdateFailure(err))
        throw new SubmissionError({ error: err.err, _error: err.err })
      })
  }
}



// Delete
const fetchDeleteSuccess = (_id) => ({ type: DELETE, _id })
const fetchDeleteFailure = (error) => ({ type: ERROR, error })
export const fetchDelete = (_id) => {
  return (dispatch, getState) => {
    return fetch(`/api/${route}/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth': localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return Promise.reject(json.error)
        dispatch(fetchDeleteSuccess(json._id))
      })
      .catch(err => {
        dispatch(fetchDeleteFailure(err))
        throw new SubmissionError({ error: err.err, _error: err.err })
      })
  }
}
