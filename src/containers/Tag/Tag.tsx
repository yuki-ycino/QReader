import React from "react"
import { NavigationScreenProps, NavigationScreenProp } from "react-navigation"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"

import { Tag as TagComponent } from "../../components/Tag"
import { State } from "../../store"
import { Tag as TagType } from "../../modules/tag"
import { fetchArticles, Actions as ArticlesActions } from "../../modules/articles"
import { selectArticle, Actions as ArticleActions, Article } from "../../modules/article"

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
  onPressArticle(navigation: NavigationScreenProp<{}, {}>, article: Article) {
    dispatch(selectArticle({ article }))
    navigation.navigate("Article")
  }
})

class TagContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchArticles(this.props.tag)
  }

  render() {
    return (
      <TagComponent
        navigation={this.props.navigation}
        articles={this.props.articles}
        onPressArticle={this.props.onPressArticle}
      />
    )
  }
}

export const Tag = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagContainer)
