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
            <h1 class="mb-3" style="font-weight: bold; color: #FF3131;">Hola de Nuevo</h1>
            <form class="col-md-8" @submit.prevent="validarCampos">
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
              <div class="mb-3">
                <button type="submit" class="btn btn-primary col-md-4" style="background-color: #FF3131; border-color: #FF3131;">Continuar</button>
              </div>
              <div>
                <p class="d-inline-block ms-1 fw-bold">¿No tienes una cuenta?
                  <router-link to="/SignUp" style="text-decoration: none; color: inherit;">
                    <span style="color: red;">Regístrate</span>
                  </router-link>
                </p>
                <p class="d-inline-block ms-1 fw-bold">¿No te acuerdas tu contraseña?
                  <span @click="resetPassword" class="recover-password-link">Recuperar Contraseña</span>
                </p>
              </div>
              <p v-if="errMsg" class="alert alert-danger">{{ errMsg }}</p>
              <p v-if="msg" class="alert alert-success">{{ msg }}</p>
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
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

export default {
  name: 'SignInView',
  data() {
    return {
      email: '',
      password: '',
      errMsg: '',
      msg: '',
    };
  },
  components: {
    NavbarComponent,
    FooterComponent,
  },
  methods: {
    validarCampos() {
      this.errMsg = '';
      this.msg = '';
      if (this.email && this.password) {
        signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(() => {
          this.$router.push('/Generation');
        })
        .catch((error) => {
          this.errMsg = this.getErrorMessage(error.code);
        });
      } else {
        this.errMsg = 'Por favor, complete todos los campos.';
      }
    },
    resetPassword() {
      this.errMsg = '';
      this.msg = '';
      if (this.email) {
        sendPasswordResetEmail(getAuth(), this.email)
        .then(() => {
          this.msg = 'Correo de recuperación enviado. Por favor, verifica tu bandeja de entrada.';
        })
        .catch((error) => {
          this.errMsg = this.getErrorMessage(error.code);
        });
      } else {
        this.errMsg = 'Por favor, ingrese su correo electrónico.';
      }
    },
    getErrorMessage(errorCode) {
      switch(errorCode) {
        case "auth/invalid-email":
          return "El correo electrónico no es válido";
        case "auth/user-not-found":
          return "El usuario no existe";
        case "auth/wrong-password":
          return "La contraseña es incorrecta";
        default:
          return "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.";
      }
    }
  },
};
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

.recover-password-link {
  color: red;
  cursor: pointer; /* Cambia el cursor a una mano cuando pasa el mouse por encima */
}
</style>
