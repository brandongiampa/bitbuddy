<template>
  <navigation-bar></navigation-bar>
  <router-view/>
  <bitbuddy-footer></bitbuddy-footer>
</template>

<script lang="js">
import NavigationBar from './components/NavigationBar.vue'
import BitbuddyFooter from './components/BitbuddyFooter.vue'

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
    NavigationBar,
    BitbuddyFooter
  },
  created() {
    this.$store.dispatch('createObjects')
  },
}
</script>


<style lang="scss">
  //@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;400;500&family=Orbitron:wght@400;500&display=swap');

  html, body {
    padding: 0;
    margin: 0;
    //font-family: 'Orbitron', sans-serif;
    font-family: 'Assistant', sans-serif;
    background-color: #fefefe;
  }
  a {
    color: #0d579b;
  }
  h1, h2 {
    font-family: 'Orbitron', serif;
  }
  @media only screen and (max-width: 400px) {
        h1 {
            font-size: 1.8rem !important;
        }
    }
</style>
