import { combineReducers } from "redux"

import { State } from "./store"
import { reducer as accountReducer } from "./modules/account"
import { reducer as articlesReducer } from "./modules/articles"
import { reducer as articleReducer } from "./modules/article"
import { reducer as tagsReducer } from "./modules/tags"
import { reducer as tagReducer } from "./modules/tag"

export const rootReducer = combineReducers<State>({
  account: accountReducer,
  articles: articlesReducer,
  article: articleReducer,
  tags: tagsReducer,
  tag: tagReducer
})
