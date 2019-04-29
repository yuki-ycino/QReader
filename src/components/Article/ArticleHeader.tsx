import React from "react"
import { Linking } from "expo"
import { Button, Icon } from "native-base"

type Props = {
  url: string
}

export const ArticleHeaderRight: React.FC<Props> = ({ url }) => {
  return (
    <Button
      transparent
      onPress={() => {
        Linking.openURL(url)
      }}
    >
      <Icon type="FontAwesome" name="safari" />
    </Button>
  )
}
