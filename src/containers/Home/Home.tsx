import React from "react"
import { NavigationScreenProps, NavigationScreenProp } from "react-navigation"
import { connect } from "react-redux"
import { ThunkDispatch } from "redux-thunk"

import { Home as HomeComponent } from "../../components/Home"
import { State } from "../../store"
import { fetchTags, Actions as TagsActions } from "../../modules/tags"
import { selectTag, Actions as TagActions, Tag } from "../../modules/tag"

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
  onPressTag: (navigation: NavigationScreenProp<{}, {}>) => (tag: Tag) => {
    dispatch(selectTag({ tag }))
    navigation.navigate("Tag")
  }
})

class HomeContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {
      this.props.fetchTags(this.props.id)
    })
  }

  render() {
    return <HomeComponent tags={this.props.tags} onPressTag={this.props.onPressTag(this.props.navigation)} />
  }
}

export const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer)
