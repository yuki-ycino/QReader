import React from "react"
import { connect } from "react-redux"

import { ArticleHeader as ArticleHeaderComponent } from "../../components/Article"
import { State } from "../../store"

type Props = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: State) => {
  return {
    tag: state.tag.item
  }
}

const ArticleHeaderContainer = ({ tag }: Props) => {
  return <ArticleHeaderComponent name={tag.id} />
}

export const ArticleHeader = connect(mapStateToProps)(ArticleHeaderContainer)
