import {
  SET_USER
} from 'src/store/mutation-types'
export default {
  [SET_USER] (state, user) {
    state.user = user
  }
}
