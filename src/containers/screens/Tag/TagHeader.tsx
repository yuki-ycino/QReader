import React from "react"
import { connect } from "react-redux"

import { Header } from "../../../components/atoms/Header"
import { State } from "../../../store"

type Props = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: State) => {
  return {
    tag: state.tag.item
  }
}

const TagHeaderContainer = ({ tag }: Props) => {
  return <Header title={tag.title} />
}

export const TagHeader = connect(mapStateToProps)(TagHeaderContainer)
