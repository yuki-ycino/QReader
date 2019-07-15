import React, { useEffect } from "react"
import { NavigationScreenProps, NavigationScreenProp } from "react-navigation"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"

import { ItemList } from "../../../components/molecules/ItemList"
import { State } from "../../../store"
import { Tag as TagType } from "../../../modules/tag"
import { fetchArticles, Actions as ArticlesActions } from "../../../modules/articles"
import { selectArticle, Actions as ArticleActions, Article } from "../../../modules/article"

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & NavigationScreenProps

const mapStateToProps = (state: State) => {
  return {
    tag: state.tag.item,
    articles: state.articles.items
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<State, undefined, ArticlesActions | ArticleActions>) => ({
  async fetchArticles(tag: TagType) {
    try {
      await dispatch(fetchArticles({ tag }))
    } catch (e) {
      console.error(e)
    }
  },
  onPress: (navigation: NavigationScreenProp<{}, {}>) => (item: Article) => {
    dispatch(selectArticle({ article: item }))
    navigation.navigate("Article")
  }
})

const TagContainer = (props: Props) => {
  useEffect(() => {
    props.fetchArticles(props.tag)
  }, [])

  return <ItemList items={props.articles} onPress={props.onPress(props.navigation)} />
}

export const Tag = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagContainer)
