import { Dispatch, Reducer } from "redux"
import { ThunkDispatch } from "redux-thunk"
import produce from "immer"
import axios from "axios"
import snakecaseKeys from "snakecase-keys"

import { State as RootState } from "../store"
import { CLIENT_ID, CLIENT_SECRET } from "../const"

export type State = {
  id: string | null
  token: string | null
  stateCode: string | null
  loginSucceeded: boolean
  error: Error | null
}

type FetchAccessTokenAction = {
  type: typeof FETCH_ACCESS_TOKEN
}

type FetchAuthenticatedUser = {
  type: typeof FETCH_AUTHENTICATED_USER
}

type DeleteAccessTokenAction = {
  type: typeof DELETE_ACCESS_TOKEN
}

export type Actions =
  | ReturnType<typeof setStateCode>
  | FetchAccessTokenAction
  | ReturnType<typeof fetchAccessTokenStarted | typeof fetchAccessTokenDone | typeof fetchAccessTokenFailed>
  | FetchAuthenticatedUser
  | ReturnType<
      typeof fetchAuthenticatedUserStarted | typeof fetchAuthenticatedUserDone | typeof fetchAuthenticatedUserFailed
    >
  | ReturnType<typeof resetLoginSucceeded>
  | DeleteAccessTokenAction
  | ReturnType<typeof deleteAccessTokenStarted | typeof deleteAccessTokenDone | typeof deleteAccessTokenFailed>

const initialState: State = {
  id: null,
  token: null,
  stateCode: null,
  loginSucceeded: false,
  error: null
}

const SET_STATE_CODE = "SET_STATE_CODE"

const FETCH_ACCESS_TOKEN = "FETCH_ACCESS_TOKEN"
const FETCH_ACCESS_TOKEN_STARTED = "FETCH_ACCESS_TOKEN_STARTED"
const FETCH_ACCESS_TOKEN_DONE = "FETCH_ACCESS_TOKEN_DONE"
const FETCH_ACCESS_TOKEN_FAILED = "FETCH_ACCESS_TOKEN_FAILED"

const FETCH_AUTHENTICATED_USER = "FETCH_AUTHENTICATED_USER"
const FETCH_AUTHENTICATED_USER_STARTED = "FETCH_AUTHENTICATED_USER_STARTED"
const FETCH_AUTHENTICATED_USER_DONE = "FETCH_AUTHENTICATED_USER_DONE"
const FETCH_AUTHENTICATED_USER_FAILED = "FETCH_AUTHENTICATED_USER_FAILED"

const DELETE_ACCESS_TOKEN = "DELETE_ACCESS_TOKEN"
const DELETE_ACCESS_TOKEN_STARTED = "DELETE_ACCESS_TOKEN_STARTED"
const DELETE_ACCESS_TOKEN_DONE = "DELETE_ACCESS_TOKEN_DONE"
const DELETE_ACCESS_TOKEN_FAILED = "DELETE_ACCESS_TOKEN_FAILED"

const RESET_LOGIN_SUCCEEDED = "RESET_LOGIN_SUCCEEDED"

export const setStateCode = (payload: { stateCode: string }) => ({
  type: SET_STATE_CODE as typeof SET_STATE_CODE,
  payload
})

export const fetchAccessToken = ({ code }: { code: string }) => async (
  dispatch: ThunkDispatch<RootState, undefined, Actions>
) => {
  dispatch(fetchAccessTokenStarted())

  try {
    const result = await axios.post(
      "https://qiita.com/api/v2/access_tokens",
      snakecaseKeys(
        {
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          code: code
        },
        { deep: true }
      )
    )
    dispatch(fetchAccessTokenDone({ token: result.data.token }))
    dispatch(fetchAuthenticatedUser())
  } catch (error) {
    dispatch(fetchAccessTokenFailed({ error }))
  }
  return
}

const fetchAccessTokenStarted = () => ({
  type: FETCH_ACCESS_TOKEN_STARTED as typeof FETCH_ACCESS_TOKEN_STARTED
})

const fetchAccessTokenDone = (payload: { token: string }) => ({
  type: FETCH_ACCESS_TOKEN_DONE as typeof FETCH_ACCESS_TOKEN_DONE,
  payload
})

const fetchAccessTokenFailed = (payload: { error: Error }) => ({
  type: FETCH_ACCESS_TOKEN_FAILED as typeof FETCH_ACCESS_TOKEN_FAILED,
  payload
})

const fetchAuthenticatedUser = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(fetchAuthenticatedUserStarted())

  try {
    const result = await axios.get("https://qiita.com/api/v2/authenticated_user", {
      headers: { Authorization: `Bearer ${getState().account.token}` }
    })
    dispatch(fetchAuthenticatedUserDone({ id: result.data.id }))
  } catch (error) {
    dispatch(fetchAuthenticatedUserFailed({ error }))
  }
  return
}

const fetchAuthenticatedUserStarted = () => ({
  type: FETCH_AUTHENTICATED_USER_STARTED as typeof FETCH_AUTHENTICATED_USER_STARTED
})

const fetchAuthenticatedUserDone = (payload: { id: string }) => ({
  type: FETCH_AUTHENTICATED_USER_DONE as typeof FETCH_AUTHENTICATED_USER_DONE,
  payload
})

const fetchAuthenticatedUserFailed = (payload: { error: Error }) => ({
  type: FETCH_AUTHENTICATED_USER_FAILED as typeof FETCH_AUTHENTICATED_USER_FAILED,
  payload
})

export const resetLoginSucceeded = () => ({
  type: RESET_LOGIN_SUCCEEDED as typeof RESET_LOGIN_SUCCEEDED
})

export const deleteAccessToken = () => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(deleteAccessTokenStarted())

  try {
    await axios.delete(`https://qiita.com/api/v2/access_tokens/${getState().account.token}`)
    dispatch(deleteAccessTokenDone())
  } catch (error) {
    dispatch(deleteAccessTokenFailed({ error }))
  }
  return
}

const deleteAccessTokenStarted = () => ({
  type: DELETE_ACCESS_TOKEN_STARTED as typeof DELETE_ACCESS_TOKEN_STARTED
})

const deleteAccessTokenDone = () => ({
  type: DELETE_ACCESS_TOKEN_DONE as typeof DELETE_ACCESS_TOKEN_DONE
})

const deleteAccessTokenFailed = (payload: { error: Error }) => ({
  type: DELETE_ACCESS_TOKEN_FAILED as typeof DELETE_ACCESS_TOKEN_FAILED,
  payload
})

export const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATE_CODE: {
      return produce(state, draft => {
        draft.stateCode = action.payload.stateCode
        draft.error = null
      })
    }
    case FETCH_ACCESS_TOKEN: {
      return state
    }
    case FETCH_ACCESS_TOKEN_STARTED: {
      return produce(state, draft => {
        draft.id = null
        draft.token = null
        draft.error = null
      })
    }
    case FETCH_ACCESS_TOKEN_DONE: {
      return produce(state, draft => {
        draft.token = action.payload.token
        draft.stateCode = null
        draft.error = null
      })
    }
    case FETCH_ACCESS_TOKEN_FAILED: {
      return produce(state, draft => {
        draft.id = null
        draft.token = null
        draft.stateCode = null
        draft.error = action.payload.error
      })
    }
    case FETCH_AUTHENTICATED_USER: {
      return state
    }
    case FETCH_AUTHENTICATED_USER_STARTED: {
      return state
    }
    case FETCH_AUTHENTICATED_USER_DONE: {
      return produce(state, draft => {
        draft.id = action.payload.id
        draft.stateCode = null
        draft.loginSucceeded = true
        draft.error = null
      })
    }
    case FETCH_AUTHENTICATED_USER_FAILED: {
      return produce(state, draft => {
        draft.id = null
        draft.token = null
        draft.stateCode = null
        draft.error = action.payload.error
      })
    }
    case RESET_LOGIN_SUCCEEDED: {
      return produce(state, draft => {
        draft.loginSucceeded = false
      })
    }
    case DELETE_ACCESS_TOKEN: {
      return state
    }
    case DELETE_ACCESS_TOKEN_STARTED: {
      return state
    }
    case DELETE_ACCESS_TOKEN_DONE: {
      return produce(state, draft => {
        draft.id = null
        draft.token = null
        draft.stateCode = null
        draft.error = null
      })
    }
    case DELETE_ACCESS_TOKEN_FAILED: {
      return produce(state, draft => {
        draft.stateCode = null
        draft.error = action.payload.error
      })
    }
    default: {
      const none = (_: never) => _
      none(action)

      return state
    }
  }
}
