<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

import isUserSuper from '@/utils/isUserSuper'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')

export default defineComponent({
  name: 'App',
  data () {
    return {
      isUserSuper: false,
    }
  },
  computed: {
    // _STORE () {
    //   return this.$store.state
    // },
    ...mapState(['userName']),
  },
  watch: {
    userName: {
      immediate: true,
      async handler (v) {
        if (!v) {
          this.isUserSuper = false
          return
        }
        this.isUserSuper = await isUserSuper(v)
      },
    },
  },
  created () {
    // console.log('process.env', process.env)
    // console.log(this.$Parse)
  },
})
</script>
