import React from "react"
import { createStackNavigator, NavigationScreenProps } from "react-navigation"

import { Home as HomeContainer, HomeHeader } from "../containers/Home"
import { Tag, TagHeader } from "../containers/Tag"
import { Article, ArticleHeader, ArticleHeaderRight } from "../containers/Article"

export const Home = createStackNavigator({
  Home: {
    screen: HomeContainer,
    navigationOptions: {
      headerTitle: <HomeHeader />
    }
  },
  Tag: {
    screen: Tag,
    navigationOptions: {
      headerTitle: <TagHeader />
    }
  },
  Article: {
    screen: Article,
    navigationOptions: ({ navigation }: NavigationScreenProps) => {
      return {
        headerTitle: <ArticleHeader />,
        headerRight: <ArticleHeaderRight navigation={navigation} />
      }
    }
  }
})
