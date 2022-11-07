<template>
  <navigation-bar></navigation-bar>
  <!-- <div class="container">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </div> -->
  <router-view/>
</template>

<script lang="ts">
import NavigationBar from './components/NavigationBar.vue'

export default {
  components: {
    NavigationBar
  }
}
</script>


<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }


</style>
