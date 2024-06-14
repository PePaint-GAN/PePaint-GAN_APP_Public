<template>
    <NavbarComponent/>

    <div class="container mt-4">
        <h1 class="text-center" style="font-weight: bold; color: #FF3131;">Galería de Pinturas</h1>
        <div class="mb-4 row justify-content-center">
            <div class="col-md-3">
                <label for="fechaInicio" class="form-label fw-bold">Fecha de Inicio:</label>
                <input type="date" class="form-control" id="fechaInicio" v-model="startDate">
            </div>
            <div class="col-md-3">
                <label for="fechaFin" class="form-label fw-bold">Fecha de Fin:</label>
                <input type="date" class="form-control" id="fechaFin" v-model="endDate">
            </div>
            <div class="col-md-3 d-flex align-items-center mt-4"> <!-- Utiliza d-flex y align-items-center -->
                <button @click="filterImagesByDateRange" class="btn btn-primary w-100" style="background-color: #FF3131; border: #FF3131;">
                    Filtrar
                </button>
            </div>
        </div>
        <div class="row">
            <div v-for="imageData in imageLinksFiltered" :key="imageData.id" class="col-md-4 mb-4">
                <div class="card">
                    <img :src="imageData.image_url" :alt="'Pintura generada el ' + imageData.create_date" class="card-img-top">
                    <div class="card-body d-flex justify-content-between">
                        <p class="card-text">{{ imageData.create_date }}</p>
                        <div class="align-self-center">
                            <button @click="showImage(imageData.image_url)" class="btn btn-primary btn-sm me-1">
                                Ver
                            </button>
                            <button @click="showDeleteModal(imageData.id)" class="btn btn-danger btn-sm">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- Modal para visualización de imagen -->
        <div class="modal fade" ref="viewImageModal" id="viewImageModal" tabindex="-1" aria-labelledby="viewImageModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="viewImageModalLabel">Vista de Imagen</h5>
                    </div>
                    <div class="modal-body text-center">
                        <img :src="currentImageUrl" style="width: auto; height: 70vh; display: block; margin: 0 auto;" alt="Imagen Ampliada">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de confirmación de eliminación de imagen -->
        <div class="modal fade" ref="deleteModal" id="deleteImageModal" tabindex="-1" aria-labelledby="deleteImageModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="deleteImageModalLabel">Confirmar Eliminación</h5>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro de que deseas eliminar esta imagen permanentemente?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" @click="confirmDelete(currentImageId)">Eliminar</button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <FooterComponent/>
</template>

<script>
import NavbarComponent from './../shared/NavbarComponent.vue'
import FooterComponent from './../shared/FooterComponent.vue'
import { getAuth } from 'firebase/auth'
import axios from 'axios'
import { Modal } from 'bootstrap'

export default {
    name: 'GalleryView',
    data() {
        return {
            imageLinks: [],
            imageLinksFiltered: [],
            startDate: '',
            endDate: '',
            currentImageId: null, // ID de la imagen a eliminar
            deleteModal: null, 
            currentImageUrl: '',
            viewImageModal: null,
        };
    },
    components: {
        NavbarComponent,
        FooterComponent,
    },
    mounted() {
        this.getAuthenticatedUserId();
        this.deleteModal = new Modal(this.$refs.deleteModal);
        this.viewImageModal = new Modal(this.$refs.viewImageModal);
    },
    methods: {
        showImage(imageUrl) {
            this.currentImageUrl = imageUrl;
            this.viewImageModal.show();
        },
        showDeleteModal(imageId) {
            this.currentImageId = imageId; // Guarda el ID de la imagen que se va a eliminar
            this.deleteModal.show(); // Muestra el modal
        },
        confirmDelete(imageId) {
            // Implementa la lógica para eliminar la imagen
            this.deleteImage(imageId);
            this.deleteModal.hide(); // Cierra el modal después de confirmar
        },
        async getAuthenticatedUserId() {
            const auth = getAuth(); // Obtiene la instancia de Firebase Auth
            console.log(auth)

            // Obtén el ID del usuario autenticado
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;

                // Realiza el request con el ID del usuario
                this.getListOfImages(userId);
            } else {
                // Maneja el caso en el que no haya usuario autenticado
                console.error('No hay usuario autenticado');
            }
        },
        async getListOfImages(userId) {
            try{
                const response = await axios.get(`https://paintganwebapp.azurewebsites.net/api/painting/list/${userId}`);
                this.imageLinks = response.data;
                this.imageLinksFiltered = response.data;
            } catch (error) {
                console.error('Error al obtener la lista de enlaces', error);
            }
        },
        async editImage(imageId) {
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (user) {
                    const userId = user.uid;

                    this.$router.push(`/EditImage/${userId}/${imageId}`);
                } else {
                    console.error('No hay usuario autenticado');
                }
            } catch (error) {
                console.error('Error al editar la imagen', error);
            }
        },
        async deleteImage(imageId) {
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (user) {
                    const userId = user.uid;

                    await axios.delete(`https://paintganwebapp.azurewebsites.net/api/painting/delete/${imageId}`);

                    this.getListOfImages(userId);
                } else {
                    console.error('No hay usuario autenticado');
                }
            } catch (error) {
                console.error('Error al eliminar la imagen', error);
            }
        },
        filterImagesByDateRange() {
            if(!this.startDate || !this.endDate) {
                console.log("Fechas no válidas")
                return;
            }

            const filteredImages = this.imageLinks.filter((imageData) => {
                const fecha = imageData.create_date.split('/'); // Divide la cadena en un array ["1", "10", "2023"]
                const dia = parseInt(fecha[0]); // Convierte el día en un número
                const mes = parseInt(fecha[1]) - 1; // Resta 1 al mes ya que en JavaScript los meses van de 0 a 11
                const año = parseInt(fecha[2]); // Convierte el año en un número

                const imageDate = new Date(año, mes, dia); // Crea el objeto Date
                const startDate = new Date(this.startDate);
                const endDate = new Date(this.endDate);

                return imageDate >= startDate && imageDate <= endDate;
            });


            this.imageLinksFiltered = filteredImages;
        }

    }
}

</script>
