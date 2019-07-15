import React from "react"
import { NavigationScreenProps } from "react-navigation"

import { Footer as FooterComponent } from "../../../components/organisms/Footer"

export const Footer = ({ navigation }: NavigationScreenProps) => {
  return (
    <FooterComponent
      currentRoute={navigation.state.routes[navigation.state.index].routeName}
      onPressHome={() => navigation.navigate("Home")}
      onPressAccount={() => navigation.navigate("Account")}
    />
  )
}
