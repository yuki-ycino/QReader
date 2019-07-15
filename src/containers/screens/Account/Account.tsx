import React, { useEffect } from "react"
import { Linking } from "expo"
import { NavigationScreenProps } from "react-navigation"
import { ThunkDispatch } from "redux-thunk"
import { connect } from "react-redux"
import uuid from "uuid/v4"

import { Login, AccountInfo } from "../../../components/organisms/AccountInfo"
import { State } from "../../../store"
import { setStateCode, deleteAccessToken, Actions } from "../../../modules/account"
import { LOGIN_URL } from "../../../const"

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

const AccountContainer = (props: Props) => {
  useEffect(() => {
    props.onLoad()
  }, [])

  const { id, token } = props.account
  return (
    <>
      {id && token ? (
        <AccountInfo account={{ id }} onPressLogout={props.onPressLogout} />
      ) : (
        <Login
          onPressLogin={() => {
            Linking.openURL(`${LOGIN_URL}`)
          }}
        />
      )}
    </>
  )
}

export const Account = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountContainer)
