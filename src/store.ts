import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { persistReducer, persistStore, Persistor } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { composeWithDevTools } from "remote-redux-devtools"

import { rootReducer } from "./reducers"
import { State as AccountState } from "./modules/account"
import { State as ArticlesState } from "./modules/articles"
import { State as ArticleState } from "./modules/article"
import { State as TagsState } from "./modules/tags"
import { State as TagState } from "./modules/tag"

export type State = {
  account: AccountState
  articles: ArticlesState
  article: ArticleState
  tags: TagsState
  tag: TagState
}

export type Store = ReturnType<typeof configureStore>["store"]

const persistConfig = {
  key: "qreader",
  storage,
  whitelist: ["account"]
}

let persistor: Persistor

const createEnhancer = () => {
  const middleware = [thunk, logger]

  const composeEnhancers = composeWithDevTools(applyMiddleware(...middleware))
  return composeEnhancers
}

export const configureStore = (initialState = {}) => {
  const enhancer = createEnhancer()
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = createStore(persistedReducer, initialState, enhancer)
  persistor = persistStore(store)

  return { store, persistor }
}

export const cleanPersistor = () => {
  if (persistor) {
    persistor.purge()
  }
}
