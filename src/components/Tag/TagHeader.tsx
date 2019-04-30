import React from "react"
import { Title } from "native-base"

type Props = {
  name: string
}

export const TagHeader: React.FC<Props> = ({ name }) => {
  return <Title>{name}</Title>
}
