<template>
    <div>
      <NavbarComponent />
      <div class="container-fluid ps-0">
        <h1 class="m-4" style="font-weight: bold; color: #FF3131;">Actualiza tus Datos</h1>
        <h5 class="m-4" style="font-weight: bold; color: black;">Tipo de Cuenta: {{ isArtist ? 'Artista' : 'Institución' }}</h5>
        <div class="row">
          <div class="col-md-6 p-5 pt-0">
            <div class="row">
              <div class="col-md-6">
              <form>
                <div class="mb-3">
                  <label for="username" class="form-label fw-bold">Nombre de usuario</label>
                  <div class="input-group">
                    <span class="input-group-text" id="username-addon">👤</span>
                    <input type="text" class="form-control" id="username" v-model="username" placeholder="Nombre de usuario" aria-label="Nombre de usuario" aria-describedby="username-addon" />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="fullName" class="form-label fw-bold">Nombre completo</label>
                  <div class="input-group">
                    <span class="input-group-text" id="fullName-addon">👥</span>
                    <input type="text" class="form-control" id="fullName" v-model="fullName" placeholder="Nombre completo" aria-label="Nombre completo" aria-describedby="fullName-addon" />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label fw-bold">Dirección</label>
                  <div class="input-group">
                    <span class="input-group-text" id="address-addon">🏠</span>
                    <input type="text" class="form-control" id="address" v-model="address" placeholder="Dirección" aria-label="Dirección" aria-describedby="address-addon" />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="phoneNumber" class="form-label fw-bold">Número de teléfono</label>
                  <div class="input-group">
                    <span class="input-group-text" id="phoneNumber-addon">📞</span>
                    <input type="text" class="form-control" id="phoneNumber" v-model="phoneNumber" placeholder="Número de teléfono" aria-label="Número de teléfono" aria-describedby="phoneNumber-addon" />
                  </div>
                </div>
                
                <div v-if="isArtist">
                  <label class="form-label fw-bold" for="isPublic">¿Deseas compartir tu perfil?</label>
                    <div class="form-check form-switch">
                      <input class="form-check-input custom-checkbox" type="checkbox" id="isPublic" v-model="isPublic" :style="{ 'background-color': isPublic ? '#FF3131' : '' }">
                      <label class="form-check-label fw-bold" for="isPublic">{{ isPublic ? 'Sí' : 'No' }}</label>
                    </div>
                </div>
                <button v-if="!isArtist" @click="showModal(updateModal)" type="button" class="btn btn-primary mt-3" style="background-color: #FF3131; border-color: #FF3131;">Actualizar</button>
                <p v-if="errMsg" class="alert alert-danger mt-3">{{ errMsg }}</p>
                
              </form>
          </div>
          <div class="col-md-6" v-if="isArtist">
            <form>
                <!-- Campo para Facebook -->
                <div class="mb-3">
                  <label for="facebook" class="form-label fw-bold">Facebook</label>
                  <div class="input-group">
                    <span class="input-group-text" id="facebook-addon">
                      <i class="fab fa-facebook"></i>
                    </span>
                    <input type="text" class="form-control" id="facebook" v-model="facebook" placeholder="URL de Facebook" aria-label="Cuenta de Facebook" aria-describedby="facebook-addon" />
                  </div>
                </div>

                <!-- Campo para Instagram -->
                <div class="mb-3">
                  <label for="instagram" class="form-label fw-bold">Instagram</label>
                  <div class="input-group">
                    <span class="input-group-text" id="instagram-addon">
                      <i class="fab fa-instagram"></i>
                    </span>
                    <input type="text" class="form-control" id="instagram" v-model="instagram" placeholder="URL de Instagram" aria-label="Cuenta de Instagram" aria-describedby="instagram-addon" />
                  </div>
                </div>

                <!-- Campo para Twitter -->
                <div class="mb-3">
                  <label for="twitter" class="form-label fw-bold">Twitter</label>
                  <div class="input-group">
                    <span class="input-group-text" id="twitter-addon">
                      <i class="fab fa-twitter"></i>
                    </span>
                    <input type="text" class="form-control" id="twitter" v-model="twitter" placeholder="URL de Twitter" aria-label="Cuenta de Twitter" aria-describedby="twitter-addon" />
                  </div>
                </div>

                <!-- Campo para Otra Página Personal -->
                <div class="mb-3">
                  <label for="personalPage" class="form-label fw-bold">Página Personal</label>
                  <div class="input-group">
                    <span class="input-group-text" id="personalPage-addon">
                      <i class="fas fa-link"></i>
                    </span>
                    <input type="text" class="form-control" id="personalPage" v-model="personalPage" placeholder="URL de la página personal" aria-label="URL de la página personal" aria-describedby="personalPage-addon" />
                  </div>
                </div>
                <button @click="showModal(updateModal)" type="button" class="btn btn-primary mt-3" style="background-color: #FF3131; border-color: #FF3131;">Actualizar</button>
                
            </form>
                
          </div>
            </div>
            
          </div>
          
          <div class="col-md-4 p-5 pt-0">
            <h3 class="mb-3" style="font-weight: bold;">Opciones de Cuenta:</h3>
            <button @click="logout" type="button" class="btn btn-danger me-2">Cerrar Sesión</button>
            <button @click="showModal(deleteModal)" type="button" class="btn btn-danger">Eliminar Cuenta</button>
          </div>
        </div>
        <!-- Modal para confirmación de actualización de datos -->
        <div class="modal fade" id="updateConfirmationModal" tabindex="-1" role="dialog" aria-labelledby="updateConfirmationModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="updateConfirmationModalLabel">Confirmar Actualización</h5>
              </div>
              <div class="modal-body">
                <div v-if="successMsg" class="alert alert-success">
                  {{ successMsg }}
                </div>
                <div v-else>
                  ¿Estás seguro de que quieres actualizar tus datos?
                </div>
              </div>
              <div class="modal-footer" v-if="!successMsg">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-primary" @click="confirmUpdate">Aceptar</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal para confirmación de eliminación de cuenta -->
        <div class="modal fade" id="deleteConfirmationModal" tabindex="-1" role="dialog" aria-labelledby="deleteConfirmationModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteConfirmationModalLabel">Confirmar Eliminación</h5>
              </div>
              <div class="modal-body">
                ¿Estás seguro de que quieres eliminar tu cuenta permanentemente?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger" @click="confirmDelete">Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  </template>
  
<script>
    import { Modal } from 'bootstrap';
    import NavbarComponent from './../shared/NavbarComponent.vue';
    import FooterComponent from './../shared/FooterComponent.vue';
    import { getAuth, updateProfile } from "firebase/auth";
    import axios from 'axios';
  
    export default {
        name: 'SettingsView',
        data() {
            return {
                username: '',
                fullName: '',
                address: '',
                phoneNumber: '',
                facebook: '',
                instagram: '',
                twitter: '',
                personalPage: '',
                isPublic: false,
                isArtist: false,
                errMsg: '',
                successMsg: '',
                updateModal: null,
                deleteModal: null,
            };
        },
        components: {
        NavbarComponent,
        FooterComponent,
        },
        mounted() {
            this.getData();
            this.initModals();
        },
        methods: {
            initModals() {
              const updateModalElement = document.getElementById('updateConfirmationModal');
              const deleteModalElement = document.getElementById('deleteConfirmationModal');
              this.updateModal = new Modal(updateModalElement);
              this.deleteModal = new Modal(deleteModalElement);
            },
            showModal(modalInstance) {
                modalInstance.show();
            },
            hideModal(modalInstance) {
                modalInstance.hide();
            },
            async confirmUpdate() {
                await this.updateUserData();
                this.successMsg = 'Actualización exitosa';
                setTimeout(() => {
                  this.hideModal(this.updateModal);
                  this.$router.push('/');
                }, 2000);
            },
            confirmDelete() {
                this.deleteAccount();
                this.hideModal(this.deleteModal);
            },
            async getData() {
                this.username = getAuth().currentUser.displayName;
                try {
                    const response = await axios.get('https://paintganwebapp.azurewebsites.net/api/user/get/' + getAuth().currentUser.uid);
                    const userData = response.data;
                    this.fullName = userData.fullName;
                    this.address = userData.address;
                    this.phoneNumber = userData.phoneNumber;
                    this.isPublic = userData.isPublic;
                    this.isArtist = userData.isArtist;
                    this.facebook = userData.facebook;
                    this.instagram = userData.instagram;
                    this.twitter = userData.twitter;
                    this.personalPage = userData.personalPage;
                } catch (error) {
                    console.error('Error al obtener los datos del usuario:', error);
                    throw error;
                }
            },
            async updateUserData() {
                try {
                    await updateProfile(getAuth().currentUser, {
                        displayName: this.username,
                    })

                    const userData = {
                        id: getAuth().currentUser.uid,
                        username: this.username,
                        fullName: this.fullName,
                        address: this.address,
                        phoneNumber: this.phoneNumber,
                        isPublic: this.isPublic,
                        facebook: this.facebook,
                        instagram: this.instagram,
                        twitter: this.twitter,
                        personalPage: this.personalPage,
                    }

                    await axios.put('https://paintganwebapp.azurewebsites.net/api/user/update/' + getAuth().currentUser.uid, userData);
                    this.errMsg = '';

                } catch(error) {
                    console.error('Error al actualizar los datos del usuario:', error);
                    this.errMsg = 'Error al actualizar los datos del usuario';
                }
            },
            logout() {
                getAuth().signOut();
                this.$router.push('/');
            },
            async deleteAccount() {
                try {
                    const user = getAuth().currentUser;
                    await axios.delete('https://paintganwebapp.azurewebsites.net/api/user/delete/' + user.uid);
                    await user.delete();
                    this.$router.push('/');
                } catch (error) {
                    console.error('Error al eliminar la cuenta:', error);
                }
            },
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
  </style>
  