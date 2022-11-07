<template>
  <div class="home">
    <hero-section></hero-section>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HeroSection from '@/components/HeroSection.vue'; // @ is an alias to /src

@Options({
  components: {
    HeroSection,
  },
})
export default class HomeView extends Vue {}
</script>
