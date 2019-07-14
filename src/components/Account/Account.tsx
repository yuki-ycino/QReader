import React from "react"
import { Header, Left, Body, Title, Right, Button, Text } from "native-base"

type Props = {
  account: { id: string }
  onPressLogout: () => void
}

export const Account = (props: Props) => {
  return (
    <>
      <Header>
        <Left />
        <Body>
          <Title>Account</Title>
        </Body>
        <Right />
      </Header>
      <Text style={{ margin: 20 }}>ID: {props.account.id}</Text>
      <Button onPress={props.onPressLogout} block danger style={{ margin: 20 }}>
        <Text>Logout</Text>
      </Button>
    </>
  )
}
