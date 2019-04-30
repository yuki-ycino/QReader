import React from "react"
import { connect } from "react-redux"

import { TagHeader as TagHeaderComponent } from "../../components/Tag"
import { State } from "../../store"

type Props = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: State) => {
  return {
    tag: state.tag.item
  }
}

const TagHeaderContainer: React.FC<Props> = ({ tag }) => {
  return <TagHeaderComponent name={tag.id} />
}

export const TagHeader = connect(mapStateToProps)(TagHeaderContainer)
