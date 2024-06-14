<template>
    <Splide :options="options" aria-label="Paintings">
      <SplideSlide>
        <img src="../assets/Colonial-0001.jpg" alt="Painting1">
      </SplideSlide>
      <SplideSlide>
        <img src="../assets/Colonial-0004.jpg" alt="Painting2">
      </SplideSlide>
      <SplideSlide>
        <img src="../assets/Colonial-0050.jpg" alt="Painting3">
      </SplideSlide>
    </Splide>
  </template>
  
  <script>
  import { Splide, SplideSlide } from '@splidejs/vue-splide';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: {
      Splide,
      SplideSlide,
    },
  
    setup() {
      const options = {
        type: 'loop',
        padding: '5rem',
        fixedWidth: '15em',
        gap: '10rem',
        focus: 'center',
        autoplay: true,
        interval: 3000,
      };
  
      return { options };
    },
  });
  </script>
  
  <style scoped>
  .splide__slide:not(.is-active) img {
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }
  </style>
  