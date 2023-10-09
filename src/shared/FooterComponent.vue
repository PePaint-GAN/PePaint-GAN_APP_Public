<template>
    <footer class="footer mt-4">
  
      <ul class="footer-brand">
        <li class="footer-item">
            Pe-PaintGAN 2023
        </li>
        <div style="display: inline-block; border-left: 2px solid white; padding-left: 20px;">
            <li class="footer-item">
                Terminos y Condiciones
            </li>
            <li class="footer-item">
                Politica de Privacidad
            </li>
        </div>
      </ul>
  
    </footer>
  </template>

<script>
    export default {
        name: 'FooterComponent',
        components: {
        }
    }
</script>

<style scoped>
    .footer {
        position: sticky;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        background-color: #b9ac92;
        color: white;
    }

    .footer-brand {
        display: flex; 
        align-items: center; 
        list-style-type: none; 
        padding: 0; 
        margin: 0;
        width: 100%;
    }

    .footer-item {
        margin-right: 20px;
        font-size: 13px; 
        font-weight: bold;
        color: white;
    }
</style>