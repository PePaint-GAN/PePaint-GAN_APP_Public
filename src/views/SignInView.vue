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
            <form class="col-md-8">
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
                <button @click="validarCampos" type="button" class="btn btn-primary col-md-4" style="background-color: #FF3131; border-color: #FF3131;">Continuar</button>
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
      if (this.email && this.password) {
        signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(() => {
          console.log('Usuario logueado');
          console.log(getAuth().currentUser);
          this.$router.push('/Generation');
        })
        .catch((error) => {
          console.log(error.code);
          switch(error.code) {
            case "auth/invalid-email":
              this.errMsg = "El correo electrónico no es válido.";
              break;
            case "auth/user-not-found":
              this.errMsg = "El usuario no existe.";
              break;
            case "auth/wrong-password":
              this.errMsg = "La contraseña es incorrecta.";
              break;
            default:
              this.errMsg = "Correo o contraseña incorrectos.";
              break;
          }
        })
        console.log('Por favor, complete todos los campos.');
      }
    },
    resetPassword() {
      if (this.email) {
        sendPasswordResetEmail(getAuth(), this.email)
        .then(() => {
          console.log('Correo de recuperación enviado');
          this.msg = 'Correo de recuperación enviado';
        })
        .catch((error) => {
          console.log(error.code);
          switch(error.code) {
            case "auth/invalid-email":
              this.errMsg = "El correo electrónico no es válido.";
              break;
            case "auth/user-not-found":
              this.errMsg = "El usuario no existe.";
              break;
            default:
              this.errMsg = "Correo o contraseña incorrectos.";
              break;
          }
        })
      } else {
        this.errMsg = 'Por favor, ingrese su correo electrónico.';
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
