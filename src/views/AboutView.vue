<template>
  <div class="about">
    <hero-section :is-main-page="false" />
  </div>
</template>

<script lang="js">
  import HeroSection from '@/components/HeroSection.vue'; // @ is an alias to /src

  export default {
    components: {
      HeroSection
    }
  }
</script>