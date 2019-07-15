import React from "react"
import { FlatList } from "react-navigation"
import { ListItem, Text } from "native-base"

type Item = {
  id: string
  title: string
}

type Props<T extends Item> = {
  items: Array<T>
  onPress: (item: T) => void
}

export const ItemList = <T extends Item>({ items, onPress }: Props<T>) => {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => {
        return (
          <ListItem onPress={() => onPress(item)}>
            <Text>{item.title}</Text>
          </ListItem>
        )
      }}
      keyExtractor={item => item.id}
    />
  )
}
