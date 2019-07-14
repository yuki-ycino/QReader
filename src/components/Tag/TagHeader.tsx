import React from "react"
import { Title } from "native-base"

type Props = {
  name: string
}

export const TagHeader = ({ name }: Props) => {
  return <Title>{name}</Title>
}
