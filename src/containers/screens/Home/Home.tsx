import React, { useEffect } from "react"
import { NavigationScreenProps, NavigationScreenProp } from "react-navigation"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"

import { ItemList } from "../../../components/molecules/ItemList"
import { State } from "../../../store"
import { fetchTags, Actions as TagsActions } from "../../../modules/tags"
import { selectTag, Actions as TagActions, Tag } from "../../../modules/tag"

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & NavigationScreenProps

const mapStateToProps = (state: State) => {
  return {
    id: state.account.id,
    tags: state.tags.items
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<State, undefined, TagsActions | TagActions>) => ({
  async fetchTags(id: string | null) {
    if (id) {
      try {
        await dispatch(fetchTags({ id }))
      } catch (e) {
        console.error(e)
      }
    }
  },
  onPress: (navigation: NavigationScreenProp<{}, {}>) => (item: Tag) => {
    dispatch(selectTag({ tag: item }))
    navigation.navigate("Tag")
  }
})

const HomeContainer = (props: Props) => {
  useEffect(() => {
    props.fetchTags(props.id)
    props.navigation.addListener("didFocus", () => {
      props.fetchTags(props.id)
    })
  }, [])

  return <ItemList items={props.tags} onPress={props.onPress(props.navigation)} />
}

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
