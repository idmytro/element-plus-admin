<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  computed: {
    _STORE () {
      return this.$store.state
    },
  },
  created () {
    // console.log('process.env', process.env)
    console.log(this.$Parse)
  },
})
</script>
