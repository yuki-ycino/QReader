import { Reducer } from "redux"
import produce from "immer"

export type Article = {
  id: string
  url: string
  title: string
  user: { id: string }
  tags: Array<{ name: string }>
  createdAt: string
  updatedAt: string
}

export type State = {
  item: Article
}

export type Actions = ReturnType<typeof selectArticle>

const initialState: State = {
  item: {
    id: "",
    url: "",
    title: "",
    user: { id: "" },
    tags: [],
    createdAt: "",
    updatedAt: ""
  }
}

const SELECT_ARTICLE = "SELECT_ARTICLE"

export const selectArticle = (payload: { article: Article }) => ({
  type: SELECT_ARTICLE as typeof SELECT_ARTICLE,
  payload
})

export const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_ARTICLE: {
      return produce(state, draft => {
        draft.item = action.payload.article
      })
    }
    default: {
      // const none = (_: never) => _
      // none(action)

      return state
    }
  }
}
