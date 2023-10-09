<template>
    <div>
      <NavbarComponent />
      <div class="container-fluid mt-4">
        <h1 class="m-3" style="font-weight: bold; color: #FF3131;">Lista de Artistas</h1>
  
        <div class="row">
          <div class="col-md-6">
            <!-- Filtro de usuario -->
            <div class="mb-3">
            <input type="text" class="form-control" v-model="userFilter" placeholder="Filtrar por usuario" />
            </div>
            <div class="table-responsive">
              <table class="table table-striped table-hover rounded-start rounded-end">
                <thead>
                  <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in filteredUsers" :key="index">
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                      <button @click="mostrarDetalles(user)" class="btn btn-primary btn-sm">Detalles</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-if="mostrarDetallesUsuario" class="col-md-6">
            <!-- Tarjeta (Card) para los detalles del artista -->
            <div class="card">
              <div class="card-body">
                <h2 class="card-title" style="font-weight: bold; color: #FF3131;">Detalles del Artista</h2>
                <p class="card-text"><strong>Usuario:</strong> {{ usuarioSeleccionado.username }}</p>
                <p class="card-text"><strong>Nombre:</strong> {{ usuarioSeleccionado.fullName }}</p>
                <p class="card-text"><strong>Correo:</strong> {{ usuarioSeleccionado.email }}</p>
                <p class="card-text"><strong>Dirección:</strong> {{ usuarioSeleccionado.address }}</p>
                <p class="card-text"><strong>Número de Teléfono:</strong> {{ usuarioSeleccionado.phoneNumber }}</p>
                <p class="card-text"><strong>Página Personal:</strong> <a :href="usuarioSeleccionado.personalPage" target="_blank">{{ usuarioSeleccionado.personalPage }}</a></p>
                <p class="card-text"><strong>Facebook:</strong> <a :href="usuarioSeleccionado.facebook" target="_blank">{{ usuarioSeleccionado.facebook }}</a></p>
                <p class="card-text"><strong>Twitter:</strong> <a :href="usuarioSeleccionado.twitter" target="_blank">{{ usuarioSeleccionado.twitter }}</a></p>
                <p class="card-text"><strong>Instagram:</strong> <a :href="usuarioSeleccionado.instagram" target="_blank">{{ usuarioSeleccionado.instagram }}</a></p>
                <button @click="ocultarDetalles" class="btn btn-secondary btn-sm">Cerrar</button>
              </div>
            </div>
            <!-- Fin de la tarjeta (Card) -->
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  </template>
  
  <script>
  import NavbarComponent from './../shared/NavbarComponent.vue'
  import FooterComponent from './../shared/FooterComponent.vue'
  import axios from 'axios'
  
  export default {
    name: 'ContactView',
    components: {
      NavbarComponent,
      FooterComponent,
    },
    data() {
      return {
        users: [],
        mostrarDetallesUsuario: false,
        usuarioSeleccionado: null,
        userFilter: '', // Filtro de usuario
      }
    },
    mounted() {
      this.getPublicArtists()
    },
    methods: {
      mostrarDetalles(user) {
        this.mostrarDetallesUsuario = true;
        this.usuarioSeleccionado = user;
      },
      ocultarDetalles() {
        this.mostrarDetallesUsuario = false;
        this.usuarioSeleccionado = null;
      },
      async getPublicArtists() {
        try {
          const response = await axios.get('http://127.0.0.1:5000/api/user/list')
          this.users = response.data.filter(user => user.isArtist && user.isPublic)
        } catch (error) {
          console.error('Error al obtener la lista de artistas:', error);
        }
      },
    },
    computed: {
      // Filtrar la lista de artistas por usuario
      filteredUsers() {
        return this.users.filter(user => user.username.toLowerCase().includes(this.userFilter.toLowerCase()));
      },
    },
  }
  </script>
  