<template>
    <div>
      <NavbarComponent />
      <div class="container-fluid ps-0">
        <div class="row">
          <div class="col-md-6">
            <img src="../assets/Colonial-0001.jpg" alt="Painting" class="w-100 h-100 shadow-lg opacity-75"/>
          </div>
          <div class="col-md-6">
            <div class="d-flex justify-content-center align-items-start flex-column h-100">
              <h1 class="mb-3" style="font-weight: bold; color: #FF3131;">Crea tu Cuenta</h1>
              <form class="col-md-8">
                <div class="mb-2">
                    <div class="input-group">
                    <span class="input-group-text" id="username-addon">👤</span>
                    <input type="text" class="form-control custom-input" id="username" v-model="username" placeholder="Usuario" aria-label="Usuario" aria-describedby="username-addon" style="height: 50px;" />
                    </div>
                </div>
                <div class="mb-2">
                    <div class="input-group">
                    <span class="input-group-text" id="email-addon">✉️</span>
                    <input type="email" class="form-control custom-input" id="email" v-model="email" placeholder="Correo electrónico" aria-label="Correo electrónico" aria-describedby="email-addon" style="height: 50px;" />
                    </div>
                </div>
                <div class="mb-3">
                    <div class="input-group">
                    <span class="input-group-text" id="password-addon">🔒</span>
                    <input type="password" class="form-control custom-input" id="password" v-model="password" placeholder="Contraseña" aria-label="Contraseña" aria-describedby="password-addon" style="height: 50px;" />
                    </div>
                </div>
                <div class="mb-3 row">
                  <div class="col-md-6">
                    <label class="form-label fw-bold" for="isArtist">¿Eres un artista?</label>
                    <div class="form-check form-switch">
                      <input class="form-check-input custom-checkbox" type="checkbox" id="isArtist" v-model="isArtist" :style="{ 'background-color': isArtist ? '#FF3131' : '' }">
                      <label class="form-check-label fw-bold" for="isArtist">{{ isArtist ? 'Sí' : 'No' }}</label>
                    </div>
                  </div>
                  <div class="col-md-6" v-if="isArtist">
                    <label class="form-label fw-bold" for="isPublic">¿Deseas compartir tu perfil?</label>
                    <div class="form-check form-switch">
                      <input class="form-check-input custom-checkbox" type="checkbox" id="isPublic" v-model="isPublic" :style="{ 'background-color': isPublic ? '#FF3131' : '' }">
                      <label class="form-check-label fw-bold" for="isPublic">{{ isPublic ? 'Sí' : 'No' }}</label>
                    </div>
                  </div>
                </div>
                <button @click="register" type="submit" class="btn btn-primary col-md-5" style="background-color: #FF3131; border-color: #FF3131;">Registrarse</button>
                <p class="d-inline-block ms-1 fw-bold">¿Tienes una cuenta?
                  <router-link to="/SignIn" style="text-decoration: none; color: inherit;">
                    <span style="color: red;">Inicia Sesion</span>
                  </router-link>
                </p>
                <div v-if="error" class="alert alert-danger">
                  {{ error }}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
</template>

<script>
import NavbarComponent from './../shared/NavbarComponent.vue'
import FooterComponent from './../shared/FooterComponent.vue'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from 'axios'

export default {
    name: 'SignUpView',
    data() {
      return {
        email: '',
        password: '',
        username: '',
        isArtist: false,
        isPublic: false,
        error: null,
      };
    },
    components: {
        NavbarComponent,
        FooterComponent,
    },
    methods: {
      async register() {
        if (this.email && this.password && this.username) {
          try {
            const userCredential = await createUserWithEmailAndPassword(getAuth(), this.email, this.password);

            await updateProfile(userCredential.user, {
              displayName: this.username,
            })

            const userData = {
              username: this.username,
              email: this.email,
              password: this.password,
              id: userCredential.user.uid,
              isArtist: this.isArtist,
              isPublic: this.isPublic,
            }

            await axios.post('http://127.0.0.1:5000/api/user/add', userData);
            this.$router.push('/Generation');
          } catch (error) {
            console.error(error);
            this.error = this.getErrorMessage(error.code);
          }
        } else {
          console.log('Por favor, complete todos los campos.');
        }
      },
      getErrorMessage(errorCode) {
        // Define mensajes de error personalizados según el código de error de Firebase
        switch (errorCode) {
          case 'auth/email-already-in-use':
            return 'El correo electrónico ya está en uso.';
          case 'auth/invalid-email':
            return 'El correo electrónico es inválido.';
          case 'auth/weak-password':
            return 'La contraseña debe tener al menos 6 caracteres.';
          default:
            return 'Ocurrió un error durante el registro. Por favor, inténtalo nuevamente.';
        }
      },
    },
}
</script>

<style>
    .custom-input {
        border-color: #B9AC92 !important;
        color: #B9AC92 !important;
        height: 40px !important;
        font-size: 15px !important;
        padding: 10px !important;
    }

    .custom-input::placeholder {
        color: #B9AC92 !important; /* Color de texto de marcador de posición con transparencia */
        background: transparent !important;
    }

    .custom-checkbox {
      border-color: #FF3131 !important; /* Establece el color del borde a #FF3131 */
    }
</style>