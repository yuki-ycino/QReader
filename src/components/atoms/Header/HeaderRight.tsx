import React from "react"
import { Button } from "native-base"

type Props = {
  onPress: () => void
}

export const HeaderRight: React.FC<Props> = ({ onPress, children }) => {
  return (
    <Button transparent onPress={onPress}>
      {children}
    </Button>
  )
}
