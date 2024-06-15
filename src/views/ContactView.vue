<template>
    <div>
      <NavbarComponent />
      <div class="container-fluid mt-4">
        <h1 class="m-3" style="font-weight: bold; color: #FF3131;">Lista de Artistas</h1>
  
        <div class="row">
          <div class="col-md-6">
            <!-- Filtro de usuario -->
            <div class="mb-3">
            <input type="text" class="form-control" v-model="userFilter" placeholder="Filtrar por nombre o usuario" />
            </div>
            <div class="table-responsive">
              <table class="table table-striped table-hover rounded-start rounded-end">
                <thead>
                  <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in filteredUsers" :key="index">
                    <td>{{ user.username }}</td>
                    <td>{{ user.fullName }}</td>
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
                <button @click="exportarDetalles" class="btn btn-info btn-sm me-1">Exportar Detalle</button>
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
                  const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/user/list`)
                  this.users = response.data.filter(user => user.isArtist && user.isPublic)
              } catch (error) {
                  console.error('Error al obtener la lista de artistas:', error);
              }
          },
          exportarDetalles() {
            if (!this.usuarioSeleccionado) {
              console.error("No hay un usuario seleccionado para exportar.");
              return;
            }
            const detallesUsuario = `
              Usuario: ${this.usuarioSeleccionado.username}
              Nombre: ${this.usuarioSeleccionado.fullName}
              Correo: ${this.usuarioSeleccionado.email}
              Dirección: ${this.usuarioSeleccionado.address}
              Número de Teléfono: ${this.usuarioSeleccionado.phoneNumber}
              Página Personal: ${this.usuarioSeleccionado.personalPage}
              Facebook: ${this.usuarioSeleccionado.facebook}
              Twitter: ${this.usuarioSeleccionado.twitter}
              Instagram: ${this.usuarioSeleccionado.instagram}
            `;
            const blob = new Blob([detallesUsuario], { type: 'text/plain;charset=utf-8' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Detalles_${this.usuarioSeleccionado.username}.txt`; // El nombre del archivo a descargar
            link.click();
            URL.revokeObjectURL(link.href); // Limpia el objeto URL
          },
      },
      computed: {
          filteredUsers() {
              return this.users.filter(user => {
                  const username = user.username ? user.username.toLowerCase() : '';
                  const fullName = user.fullName ? user.fullName.toLowerCase() : '';
                  const filter = this.userFilter.toLowerCase();
                  return username.includes(filter) || fullName.includes(filter);
              });
          },
      }
  }
  </script>
  