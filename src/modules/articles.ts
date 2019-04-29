import { Dispatch, Reducer } from "redux"
import produce from "immer"
import axios from "axios"
import camelcaseKeys from "camelcase-keys"
import snakecaseKeys from "snakecase-keys"

import { Tag } from "./tag"
import { Article } from "./article"

export type State = {
  items: Array<Article>
  error: Error | null
}

type FetchArticlesAction = {
  type: typeof FETCH_ARTICLES
}

export type Actions =
  | FetchArticlesAction
  | ReturnType<typeof fetchArticlesStarted | typeof fetchArticlesDone | typeof fetchArticlesFailed>

const initialState: State = {
  items: [],
  error: null
}

const FETCH_ARTICLES = "FETCH_ARTICLES"
const FETCH_ARTICLES_STARTED = "FETCH_ARTICLES_STARTED"
const FETCH_ARTICLES_DONE = "FETCH_ARTICLES_DONE"
const FETCH_ARTICLES_FAILED = "FETCH_ARTICLES_FAILED"

export const fetchArticles = ({ tag }: { tag: Tag }) => async (dispatch: Dispatch) => {
  dispatch(fetchArticlesStarted())

  try {
    const result = await axios.get(
      "https://qiita.com/api/v2/items",
      snakecaseKeys(
        {
          params: {
            query: `tag:${tag.id} stocks:>10`
          }
        },
        { deep: true }
      )
    )
    const articles = camelcaseKeys(result.data, { deep: true }) as Array<Article>
    dispatch(fetchArticlesDone({ articles }))
  } catch (error) {
    dispatch(fetchArticlesFailed({ error }))
  }
  return
}

const fetchArticlesStarted = () => ({
  type: FETCH_ARTICLES_STARTED as typeof FETCH_ARTICLES_STARTED
})

const fetchArticlesDone = (payload: { articles: Array<Article> }) => ({
  type: FETCH_ARTICLES_DONE as typeof FETCH_ARTICLES_DONE,
  payload
})

const fetchArticlesFailed = (payload: { error: Error }) => ({
  type: FETCH_ARTICLES_FAILED as typeof FETCH_ARTICLES_FAILED,
  payload
})

export const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES: {
      return state
    }
    case FETCH_ARTICLES_STARTED: {
      return produce(state, draft => {
        draft.items = []
      })
    }
    case FETCH_ARTICLES_DONE: {
      return produce(state, draft => {
        draft.items = action.payload.articles
      })
    }
    case FETCH_ARTICLES_FAILED: {
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
