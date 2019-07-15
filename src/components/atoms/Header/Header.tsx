import React from "react"
import { Title } from "native-base"

type Props = {
  title: string
}

export const Header = ({ title }: Props) => <Title>{title}</Title>
