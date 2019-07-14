import React, { useState } from "react"
import { WebView } from "react-native"
import { Linking } from "expo"

type Props = {
  url: string
}

export const Article = (props: Props) => {
  const [webview, setWebview] = useState<WebView | null>(null)

  return (
    <WebView
      ref={ref => setWebview(ref)}
      source={{ uri: props.url }}
      onNavigationStateChange={event => {
        if (webview && event.url && event.url !== props.url) {
          webview.stopLoading()
          Linking.openURL(event.url)
        }
      }}
    />
  )
}
