import React from "react"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"

import { ArticleHeaderRight as ArticleHeaderRightComponent } from "../../components/Article"
import { State } from "../../store"

type Props = ReturnType<typeof mapStateToProps> & NavigationScreenProps

const mapStateToProps = (state: State) => {
  return {
    url: state.article.item.url
  }
}

const ArticleHeaderRightContainer = ({ url }: Props) => {
  return <ArticleHeaderRightComponent url={url} />
}

export const ArticleHeaderRight = connect(mapStateToProps)(ArticleHeaderRightContainer)
