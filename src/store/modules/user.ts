import Parse from 'parse'
import type { GetterTree, MutationTree } from 'vuex'
import type { UserState } from '../types'
import '@/parse.js'

// const getUser = () => {}

export const state: UserState = {
  userName: '',
}

const getters : GetterTree<UserState, unknown> = {
  // getUserName (state) {
  //   return state.userName
  // },
  // async checkIsUserSuper (state) {
  //   const { userName } = state
  //   if (!userName) return false

  //   const userQuery = new Parse.Query(Parse.User)
  //   userQuery.equalTo('username', userName)
  //   const user = await userQuery.first()
  //   if (!user) return false

  //   const query = new Parse.Query(Parse.Role)
  //   query.equalTo('name', 'superUser')
  //   query.equalTo('users', user)
  //   return await query.first().then(res => !!res)
  // },
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
