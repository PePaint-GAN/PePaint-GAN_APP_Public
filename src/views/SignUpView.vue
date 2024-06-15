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
            <form class="col-md-8" @submit.prevent="register">
              <div class="mb-2">
                <div class="input-group">
                  <span class="input-group-text" id="username-addon">👤</span>
                  <input type="text" class="form-control custom-input" id="username" v-model="username" placeholder="Usuario" aria-label="Usuario" aria-describedby="username-addon" style="height: 50px;" />
                </div>
                <div v-if="usernameError" class="alert alert-danger">
                  {{ usernameError }}
                </div>
              </div>
              <div class="mb-2">
                <div class="input-group">
                  <span class="input-group-text" id="email-addon">✉️</span>
                  <input type="email" class="form-control custom-input" id="email" v-model="email" placeholder="Correo electrónico" aria-label="Correo electrónico" aria-describedby="email-addon" style="height: 50px;" />
                </div>
                <div v-if="emailError" class="alert alert-danger">
                  {{ emailError }}
                </div>
              </div>
              <div class="mb-3">
                <div class="input-group">
                  <span class="input-group-text" id="password-addon">🔒</span>
                  <input type="password" class="form-control custom-input" id="password" v-model="password" placeholder="Contraseña" aria-label="Contraseña" aria-describedby="password-addon" style="height: 50px;" />
                </div>
                <div v-if="passwordError" class="alert alert-danger">
                  {{ passwordError }}
                </div>
                <div v-if="passwordLengthError" class="alert alert-danger">
                  {{ passwordLengthError }}
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
                <button type="submit" class="btn btn-primary col-md-5" style="background-color: #FF3131; border-color: #FF3131;">Registrarse</button>
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
        usernameError: null,
        emailError: null,
        passwordError: null,
        passwordLengthError: null
      };
    },
    components: {
        NavbarComponent,
        FooterComponent,
    },
    methods: {
      async register() {
        this.clearErrors();
        if (await this.validateInputs()) {
          try {
            const userCredential = await createUserWithEmailAndPassword(getAuth(), this.email, this.password);

            await updateProfile(userCredential.user, {
              displayName: this.username,
            });

            const userData = {
              username: this.username,
              email: this.email,
              password: this.password,
              id: userCredential.user.uid,
              isArtist: this.isArtist,
              isPublic: this.isPublic,
            };

            await axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/user/add`, userData);
            this.$router.push('/Generation');
          } catch (error) {
            console.error(error);
            this.error = this.getErrorMessage(error.code);
          }
        }
      },
      async validateInputs() {
        let valid = true;

        if (this.password.length < 8) {
          this.passwordLengthError = 'La contraseña debe tener al menos 8 caracteres.';
          valid = false;
        }

        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/api/user/list`);
          const usernames = response.data.map(user => user.username);
          if (usernames.includes(this.username)) {
            this.usernameError = 'El nombre de usuario ya está en uso.';
            valid = false;
          }
        } catch (error) {
          console.error('Error verificando el nombre de usuario:', error);
          this.usernameError = 'Error verificando el nombre de usuario.';
          valid = false;
        }

        if (!this.username.match(/^[a-zA-Z0-9]+$/)) {
          this.usernameError = 'El nombre de usuario debe ser alfanumérico.';
          valid = false;
        }
        if (!this.email) {
          this.emailError = 'El correo electrónico es obligatorio.';
          valid = false;
        }
        if (!this.password.match(/^[a-zA-Z0-9]*$/)) {
          this.passwordError = 'La contraseña debe ser alfanumérica.';
          valid = false;
        }
        if (!this.username || !this.email || !this.password) {
          this.error = 'Por favor, complete todos los campos.';
          valid = false;
        }
        return valid;
      },
      clearErrors() {
        this.error = null;
        this.usernameError = null;
        this.emailError = null;
        this.passwordError = null;
        this.passwordLengthError = null;
      },
      getErrorMessage(errorCode) {
        switch (errorCode) {
          case 'auth/email-already-in-use':
            this.emailError = 'El correo electrónico ya está en uso.';
            break;
          case 'auth/invalid-email':
            this.emailError = 'El correo electrónico es inválido.';
            break;
          default:
            this.error = 'Ocurrió un error durante el registro. Por favor, inténtalo nuevamente.';
        }
      },
    },
}
</script>
