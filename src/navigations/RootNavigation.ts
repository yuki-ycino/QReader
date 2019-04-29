import { Linking } from "expo"
import { createAppContainer, createBottomTabNavigator } from "react-navigation"

import { Home } from "./HomeNavigation"
import { Account } from "../containers/Account"
import { Callback } from "../containers/Callback"
import { Footer } from "../containers/Footer"

export const prefix = Linking.makeUrl("/")

export const RootNavigation = createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: Home },
      Account: { screen: Account },
      Callback: { screen: Callback, path: "callback" }
    },
    {
      tabBarComponent: Footer,
      initialRouteName: "Home"
    }
  )
)
