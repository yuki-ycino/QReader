import { Linking } from "expo"
import { createAppContainer, createBottomTabNavigator } from "react-navigation"

import { Home } from "./HomeNavigation"
import { Account } from "../containers/screens/Account"
import { Callback } from "../containers/screens/Callback"
import { Footer } from "../containers/organisms/Footer"

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
