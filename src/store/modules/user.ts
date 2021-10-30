import type { GetterTree, MutationTree } from 'vuex'
import type { UserState } from '../types'

export const state: UserState = {
  userName: '',
}

const getters : GetterTree<UserState, unknown> = {
  getUserName (state) {
    return state.userName
  },
}

const mutations: MutationTree<UserState> = {
  setUserName (state, name: string) {
    console.log('setUserName', name)
    state.userName = name
  },
  resetUserName (state) {
    state.userName = ''
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
