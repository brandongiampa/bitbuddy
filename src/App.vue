<template>
  <navigation-bar></navigation-bar>
  <router-view/>
</template>

<script lang="js">
import NavigationBar from './components/NavigationBar.vue'

export default {
  methods: {

  },
  data() {
    return {
      cryptoArray: [],
      fiatArray: [],
      cryptoExchanges: null,
      fiatExchanges: null,
      numberOfAPIRefreshes: 0,
      interval: null
    }
  },
  components: {
    NavigationBar
  },
  created() {
    this.$store.dispatch('createObjects')
  },
}
</script>


<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

  html, body {
    padding: 0;
    margin: 0;
    font-family: 'Orbitron', sans-serif;
    background-color: #fefefe;
  }
a {
  color: #0d579b;
}
</style>
