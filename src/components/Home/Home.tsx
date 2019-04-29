import React from "react"
import { FlatList } from "react-navigation"
import { ListItem, Text } from "native-base"

import { Tag } from "../../modules/tag"

type Props = {
  tags: Array<Tag>
  onPressTag: (tag: Tag) => void
}

export const Home: React.FC<Props> = ({ tags, onPressTag }) => {
  return (
    <FlatList
      data={tags}
      renderItem={({ item: tag }) => {
        return (
          <ListItem onPress={() => onPressTag(tag)}>
            <Text>{tag.id}</Text>
          </ListItem>
        )
      }}
      keyExtractor={item => item.id}
    />
  )
}
