<template>
    <nav class="navbar" style="background-color: #FF3131; color: #fbe6d4;">
  
      <ul class="navbar-brand">
        <li class="navbar-item">
          <router-link to="/">
            <img src="../assets/logo.png" alt="home" class="logo-icon">
          </router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/Generation" style="text-decoration: none; color: inherit;">
            Generar
          </router-link>
        </li>
        <li v-if="signin" class="navbar-item">
          <router-link to="/Gallery" style="text-decoration: none; color: inherit;">
            Galería
          </router-link>
        </li>
        <li v-if="signin" class="navbar-item">
          <router-link to="/Contact" style="text-decoration: none; color: inherit;">
            Contacto
          </router-link>
        </li>
        <li v-if="signin" class="navbar-item">
          <router-link to="/Learning" style="text-decoration: none; color: inherit;">
            Aprendizaje
          </router-link>
        </li>
        <li v-if="signin" class="navbar-item" style="margin-left: auto;">
          <router-link to="/Settings" style="text-decoration: none; color: inherit;">
            Perfil
          </router-link>
        </li>
        <li v-if="!signin" class="navbar-item" style="margin-left: auto;">
          <router-link to="/SignIn" style="text-decoration: none; color: inherit;">
            Iniciar Sesión
          </router-link>
        </li>
        <li v-if="!signin" class="navbar-item">
          <router-link to="/SignUp" style="text-decoration: none; color: inherit;">
            Registrarse
          </router-link>
        </li>
        
      </ul>
  
    </nav>
  </template>

<script>
    import { getAuth, onAuthStateChanged } from 'firebase/auth';

    export default {
        name: 'NavbarComponent',
        data() {
            return {
                signin: false,
                auth: null
            }
        },
        mounted() {
          this.auth = getAuth()
          onAuthStateChanged(this.auth, (user) => {
            if (user) {
              this.signin = true;
            } else {
              this.signin = false;
            }
          });
        },
        components: {
        },
    }
</script>

<style scoped>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
    }

    .navbar-brand {
        display: flex; 
        align-items: center; 
        list-style-type: none; 
        padding: 0; 
        margin: 0;
        width: 100%;
    }

    .logo-icon {
        width: 30px;
        height: 30px;
        margin-right: 20px;
    }

    .navbar-item {
        margin-right: 30px;
        font-size: 18px; 
        font-weight: bold;
        color: #fbe6d4;
    }
</style>