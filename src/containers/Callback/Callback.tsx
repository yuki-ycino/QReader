import React from "react"
import { Alert } from "react-native"
import { NavigationScreenProps } from "react-navigation"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"

import { State } from "../../store"
import { fetchAccessToken, resetLoginSucceeded, State as AccountState, Actions } from "../../modules/account"

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & NavigationScreenProps

const mapStateToProps = ({ account }: State) => {
  return { account }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AccountState, undefined, Actions>) => ({
  async challengeLogin(code: string) {
    try {
      await dispatch(fetchAccessToken({ code }))
    } catch (e) {
      console.error(e)
    }
  },
  resetLoginSucceeded() {
    dispatch(resetLoginSucceeded())
  }
})

export class CallbackContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {
      const { id, token } = this.props.account
      const params = this.props.navigation.state.params

      if (!id && !token && params && params.code) {
        this.props.challengeLogin(params.code)
      } else {
        this.props.navigation.navigate("Home")
      }
    })
  }

  render() {
    if (this.props.account.loginSucceeded) {
      Alert.alert("ログイン完了", "", [
        {
          text: "OK",
          onPress: () => {
            this.props.navigation.navigate("Account")
            this.props.resetLoginSucceeded()
          }
        }
      ])
    }
    return <></>
  }
}

export const Callback = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallbackContainer)
