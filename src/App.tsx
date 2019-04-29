import React from "react"
import { Font } from "expo"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { Container } from "native-base"

import { configureStore } from "./store"
import { RootNavigation, prefix } from "./navigations"

const { store, persistor } = configureStore()

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf") // eslint-disable-line @typescript-eslint/camelcase
    })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Container>
            <RootNavigation uriPrefix={prefix} />
          </Container>
        </PersistGate>
      </Provider>
    )
  }
}
