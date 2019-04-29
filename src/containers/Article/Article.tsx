import React from "react"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"

import { Article as ArticleComponent } from "../../components/Article"
import { State } from "../../store"

type Props = ReturnType<typeof mapStateToProps> & NavigationScreenProps

const mapStateToProps = (state: State) => {
  return {
    url: state.article.item.url
  }
}

const ArticleContainer: React.FC<Props> = props => {
  return <ArticleComponent url={props.url} />
}

export const Article = connect(mapStateToProps)(ArticleContainer)
