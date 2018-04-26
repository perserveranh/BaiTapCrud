import {
  SET_USER
} from 'src/store/mutation-types'

const getUser = ({commit}, payloads) => {
  commit(SET_USER, payloads.user)
}

export default{
  getUser
}
