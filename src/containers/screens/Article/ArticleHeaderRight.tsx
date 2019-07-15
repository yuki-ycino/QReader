import React from "react"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { Linking } from "expo"
import { Icon } from "native-base"

import { HeaderRight } from "../../../components/atoms/Header"
import { State } from "../../../store"

type Props = ReturnType<typeof mapStateToProps> & NavigationScreenProps

const mapStateToProps = (state: State) => {
  return {
    url: state.article.item.url
  }
}

const ArticleHeaderRightContainer = ({ url }: Props) => {
  return (
    <HeaderRight
      onPress={() => {
        Linking.openURL(url)
      }}
    >
      <Icon type="FontAwesome" name="safari" />
    </HeaderRight>
  )
}

export const ArticleHeaderRight = connect(mapStateToProps)(ArticleHeaderRightContainer)
