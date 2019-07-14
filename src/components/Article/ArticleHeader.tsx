import React from "react"
import { Title } from "native-base"

type Props = {
  name: string
}

export const ArticleHeader = ({ name }: Props) => {
  return <Title>{name}</Title>
}
