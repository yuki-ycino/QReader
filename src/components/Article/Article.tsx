import React from "react"
import { WebView } from "react-native"
import { Linking } from "expo"

type Props = {
  url: string
}

export class Article extends React.Component<Props> {
  webview: WebView | null = null

  render() {
    return (
      <WebView
        ref={ref => (this.webview = ref)}
        source={{ uri: this.props.url }}
        onNavigationStateChange={event => {
          if (this.webview && event.url && event.url !== this.props.url) {
            this.webview.stopLoading()
            Linking.openURL(event.url)
          }
        }}
      />
    )
  }
}
