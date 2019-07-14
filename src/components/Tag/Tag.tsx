import React from "react"
import { FlatList, NavigationScreenProp } from "react-navigation"
import { ListItem, Text } from "native-base"

import { Article } from "../../modules/article"

type Props = {
  navigation: NavigationScreenProp<{}, {}>
  articles: Array<Article>
  onPressArticle: (navigation: NavigationScreenProp<{}, {}>, article: Article) => void
}

export const Tag = ({ navigation, articles, onPressArticle }: Props) => {
  return (
    <FlatList
      data={articles}
      renderItem={({ item: article }) => {
        return (
          <ListItem onPress={() => onPressArticle(navigation, article)}>
            <Text>{article.title}</Text>
          </ListItem>
        )
      }}
      keyExtractor={item => item.id}
    />
  )
}
