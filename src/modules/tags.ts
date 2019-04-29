import { Dispatch, Reducer } from "redux"
import produce from "immer"
import axios from "axios"
import camelcaseKeys from "camelcase-keys"

import { Tag } from "./tag"

export type State = {
  items: Array<Tag>
  error: Error | null
}

type FetchTagsAction = {
  type: typeof FETCH_TAGS
}

export type Actions =
  | FetchTagsAction
  | ReturnType<typeof fetchTagsStarted | typeof fetchTagsDone | typeof fetchTagsFailed>

const initialState: State = {
  items: [],
  error: null
}

const FETCH_TAGS = "FETCH_TAGS"
const FETCH_TAGS_STARTED = "FETCH_TAGS_STARTED"
const FETCH_TAGS_DONE = "FETCH_TAGS_DONE"
const FETCH_TAGS_FAILED = "FETCH_TAGS_FAILED"

export const fetchTags = ({ id }: { id: string }) => async (dispatch: Dispatch) => {
  dispatch(fetchTagsStarted())

  try {
    const result = await axios.get(`https://qiita.com/api/v2/users/${id}/following_tags`)
    const tags = camelcaseKeys(result.data, { deep: true }) as Array<Tag>
    dispatch(fetchTagsDone({ tags }))
  } catch (error) {
    dispatch(fetchTagsFailed({ error }))
  }
  return
}

const fetchTagsStarted = () => ({
  type: FETCH_TAGS_STARTED as typeof FETCH_TAGS_STARTED
})

const fetchTagsDone = (payload: { tags: Array<Tag> }) => ({
  type: FETCH_TAGS_DONE as typeof FETCH_TAGS_DONE,
  payload
})

const fetchTagsFailed = (payload: { error: Error }) => ({
  type: FETCH_TAGS_FAILED as typeof FETCH_TAGS_FAILED,
  payload
})

export const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TAGS: {
      return state
    }
    case FETCH_TAGS_STARTED: {
      return state
    }
    case FETCH_TAGS_DONE: {
      return produce(state, draft => {
        draft.items = action.payload.tags
      })
    }
    case FETCH_TAGS_FAILED: {
      return produce(state, draft => {
        draft.items = []
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
