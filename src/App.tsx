import React from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { Container } from "native-base"

import { configureStore } from "./store"
import { RootNavigation, prefix } from "./navigations"

const { store, persistor } = configureStore()

export default class App extends React.Component {
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
