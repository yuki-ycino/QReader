import React from "react"
import { Header, Left, Body, Title, Right, Button, Text } from "native-base"

type Props = {
  onPressLogin: () => void
}

export const Login: React.FC<Props> = props => {
  console.log(props)
  return (
    <>
      <Header>
        <Left />
        <Body>
          <Title>Account</Title>
        </Body>
        <Right />
      </Header>
      <Button onPress={props.onPressLogin} block style={{ margin: 20 }}>
        <Text>Login</Text>
      </Button>
    </>
  )
}
