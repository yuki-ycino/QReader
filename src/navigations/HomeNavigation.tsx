import React from "react"
import { createStackNavigator, NavigationScreenProps } from "react-navigation"

import { Home as HomeContainer, HomeHeader } from "../containers/Home"
import { Tag } from "../containers/Tag"
import { Article, ArticleHeaderRight } from "../containers/Article"

export const Home = createStackNavigator({
  Home: {
    screen: HomeContainer,
    navigationOptions: {
      headerTitle: <HomeHeader />
    }
  },
  Tag: {
    screen: Tag
  },
  Article: {
    screen: Article,
    navigationOptions: ({ navigation }: NavigationScreenProps) => {
      return { headerRight: <ArticleHeaderRight navigation={navigation} /> }
    }
  }
})
