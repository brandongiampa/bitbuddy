<template>
  <div class="home">
    <hero-section></hero-section>
    <crypto-info></crypto-info>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HeroSection from '@/components/HeroSection.vue'; // @ is an alias to /src
import CryptoInfo from '@/components/CryptoInfo.vue';

@Options({
  components: {
    HeroSection,
    CryptoInfo
  },
})
export default class HomeView extends Vue {}
</script>
