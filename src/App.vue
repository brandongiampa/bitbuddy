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
  //@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&family=Orbitron:wght@400;500;600;700;800;900&family=Play:wght@400;700&family=Public+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

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
</style>
