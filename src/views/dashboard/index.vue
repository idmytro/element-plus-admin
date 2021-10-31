<template>
  <div class="app-container">
    <h1>Dashboard</h1>
    <!-- <svg-icon name="dashboard" /> -->
    <!-- <app-screenfull /> -->
  </div>
</template>

<script>
import Parse from 'parse'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dashboard',
  components: {},
  data () {
    return {
      results: [],
    }
  },
  async created () {
    console.log('CR')
  },
})
</script>
