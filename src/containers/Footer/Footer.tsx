import React from "react"
import { NavigationScreenProps } from "react-navigation"

import { Footer as FooterComponent } from "../../components/Footer"

export const Footer: React.FC<NavigationScreenProps> = ({ navigation }) => {
  return (
    <FooterComponent
      currentRoute={navigation.state.routes[navigation.state.index].routeName}
      onPressHome={() => navigation.navigate("Home")}
      onPressAccount={() => navigation.navigate("Account")}
    />
  )
}