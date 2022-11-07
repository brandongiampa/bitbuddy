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
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap');

  html, body {
    padding: 0;
    margin: 0;
    font-family: 'Orbitron', sans-serif;
    background-color: #fefefe;
  }

</style>
