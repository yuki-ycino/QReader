import React from "react"
import { Linking } from "expo"
import { NavigationScreenProps } from "react-navigation"
import { ThunkDispatch } from "redux-thunk"
import { connect } from "react-redux"
import uuid from "uuid/v4"

import { Login, Account as AccountComponent } from "../../components/Account"
import { State } from "../../store"
import { setStateCode, deleteAccessToken, Actions } from "../../modules/account"
import { LOGIN_URL } from "../../const"

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & NavigationScreenProps

const mapStateToProps = (state: State) => {
  return { account: state.account }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<State, undefined, Actions>) => ({
  onLoad() {
    dispatch(setStateCode({ stateCode: uuid() }))
  },
  async onPressLogout() {
    try {
      await dispatch(deleteAccessToken())
      dispatch(setStateCode({ stateCode: uuid() }))
    } catch (e) {
      console.error(e)
    }
  }
})

class AccountContainer extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.account.token) {
      this.props.onLoad()
    }
  }

  render() {
    const { id, token } = this.props.account
    return (
      <>
        {id && token ? (
          <AccountComponent account={{ id }} onPressLogout={this.props.onPressLogout} />
        ) : (
          <Login
            onPressLogin={() => {
              Linking.openURL(`${LOGIN_URL}${this.props.account.stateCode}`)
            }}
          />
        )}
      </>
    )
  }
}

export const Account = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountContainer)
