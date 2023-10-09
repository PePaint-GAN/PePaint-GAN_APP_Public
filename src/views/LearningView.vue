<template>
    <div>
      <NavbarComponent />
      <div class="container-fluid">
        <h1 class="m-3" style="font-weight: bold; color: #FF3131;">Enlaces sobre el arte peruano</h1>
  
        <!-- Lista de enlaces -->
        <ul class="list-group">
          <li class="list-group-item">
            <a href="https://arteperuano.com.pe/" target="_blank">Arte Peruano</a>
          </li>
          <li class="list-group-item">
            <a href="https://web.archive.org/web/20100331152109/http://www.imageandart.com/tutoriales/historia_arte/precolombino/1ra_parte/index.html" target="_blank">Culturas y Arte Precolombino</a>
          </li>
          <li class="list-group-item">
            <a href="https://www.libreriasur.com.pe/libros-de/arte-peruano-03/" target="_blank">Librería de Arte Peruano</a>
          </li>
          <li class="list-group-item">
            <a href="https://www.librosperuanos.com/libros/tema/historia-del-arte/00000000001/00000000002/LI" target="_blank">Libros de Historia del Arte Peruano</a>
          </li>
          <!-- Agrega más enlaces aquí -->
        </ul>
      </div>
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import FooterComponent from '@/shared/FooterComponent.vue';
  import NavbarComponent from '@/shared/NavbarComponent.vue';
  
  export default {
    name: 'LearningView',
    components: { NavbarComponent, FooterComponent },
  };
  </script>
  