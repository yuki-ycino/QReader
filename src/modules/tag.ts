import { Reducer } from "redux"
import produce from "immer"

export type Tag = {
  id: string
  title: string
  iconUrl: string
}

export type State = {
  item: Tag
}

export type Actions = ReturnType<typeof selectTag>

const initialState: State = {
  item: {
    id: "",
    title: "",
    iconUrl: ""
  }
}

const SELECT_TAG = "SELECT_TAG"

export const selectTag = (payload: { tag: Tag }) => ({
  type: SELECT_TAG as typeof SELECT_TAG,
  payload
})

export const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TAG: {
      return produce(state, draft => {
        draft.item = action.payload.tag
      })
    }
    default: {
      // const none = (_: never) => _
      // none(action)

      return state
    }
  }
}
