import React from "react"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"

import { ArticleView } from "../../../components/organisms/ArticleView"
import { State } from "../../../store"

type Props = ReturnType<typeof mapStateToProps> & NavigationScreenProps

const mapStateToProps = (state: State) => {
  return {
    url: state.article.item.url
  }
}

const ArticleContainer = (props: Props) => {
  return <ArticleView url={props.url} />
}

export const Article = connect(mapStateToProps)(ArticleContainer)
