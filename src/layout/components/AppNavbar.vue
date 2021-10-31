<template>
  <div class="app-navbar">
    <div class="navbar-block">
      <!-- <button
        type="button"
        role="hamburger"
        class="app-hamburger"
        @click="toggleSidebar"
      >
        <svg-icon :name="menuIconName" />
      </button> -->
      <router-link
        to="/"
        class="navbar-brand pl-20px"
      >
        Kids' Emotions
      </router-link>
    </div>

    <div class="navbar-block space-x-1em">
      <span>Анткеты</span>
      <span>Добавить анкету</span>
    </div>

    <div class="navbar-block">
      <el-tooltip
        content="Развернуть на весь экран"
        class="navbar-block-item"
        effect="dark"
        placement="bottom"
      >
        <app-screenfull />
      </el-tooltip>

      <el-badge
        :max="99"
        class="!cursor-default user-message-badge"
      >
        <img
          :src="gravatar"
          class="user-avatar"
          alt="User Avatar"
        >
        <span class="user-name">{{ userName }}</span>
      </el-badge>

      <button
        class="navbar-block-item px-1em"
        style="font-size: 16px"
        @click="logout"
      >
        Выйти
      </button>
    </div>
  </div>
</template>

<script>
import Parse from 'parse'
import { defineComponent, computed } from 'vue'
import { createNamespacedHelpers } from 'vuex'

import { useEnhancer } from '@/enhancers'
import { message } from '@/utils/element'
import { SIGN_OUT, TOGGLE_SIDEBAR } from '@/constants/store'

// const md5 = require('md5')

import md5 from 'md5'

const { mapState, mapMutations } = createNamespacedHelpers('user')

const getCurrentUser = async function () {
  const currentUser = await Parse.User.current()
  if (currentUser !== null) {
    // console.log(
    //   'Success!',
    //   `${currentUser.get('username')} is the current user!`,
    // )
    // Alert.alert(
    //   'Success!',
    //   `${currentUser.get('username')} is the current user!`,
    // );
  }
  return currentUser
}

const doUserLogOut = async function () {
  try {
    await Parse.User.logOut()
    // To verify that current user is now empty, currentAsync can be used
    const currentUser = await Parse.User.current()
    if (currentUser === null) {
      alert('Success! No user is logged in anymore!')
    }
    // Update state variable holding current user
    getCurrentUser()
    return true
  } catch (error) {
    alert(`Error! ${error.message}`)
    return false
  }
}

export default defineComponent({
  name: 'AppNavbar',

  setup () {
    const { i18n, router, store } = useEnhancer()

    // const username = computed(() => 'ntnyq')
    const menuIconName = computed(() => store.getters.sidebar?.isOpen ? 'left' : 'hamburger')

    const toggleSidebar = () => {
      store.dispatch(TOGGLE_SIDEBAR.action)
    }

    const handleCommand = async (command) => {
      switch (command) {
        case 'dashboard':
          router.push('/')
          break

        case 'updatePassword':
          message.warning(i18n.t(`message.workInProgress`))
          break

        case 'signOut':
          await store.dispatch(SIGN_OUT.action)
          router.push({ name: 'SignIn' })
          break

        default:
          break
      }
    }

    return {
      i18n,
      // username,
      menuIconName,
      toggleSidebar,
      handleCommand,
    }
  },

  data () {
    return { user: null }
  },

  computed: {
    ...mapState(['userName']),
    gravatar () {
      return this.userName ? 'https://www.gravatar.com/avatar/' + md5(this.userName) : ''
    },
  },

  async created () {
    // const currentUser = await this.$Parse.User.current()
    // console.log('currentUser', currentUser)
  },

  methods: {
    ...mapMutations(['resetUserName']),
    async logout () {
      console.log('object')
      const res = await doUserLogOut()
      console.log('res', res)
      if (res) this.resetUserName()
      this.$router.push('/sign-in')
    },
  },
})
</script>
