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
                            <button @click="deleteImage(imageData.id)" class="btn btn-danger"><i class="fas fa-times"></i> Eliminar</button>
                        </div>
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

export default {
    name: 'GalleryView',
    data() {
        return {
            imageLinks: [],
            imageLinksFiltered: [],
            startDate: '',
            endDate: '',
        }
    },
    components: {
        NavbarComponent,
        FooterComponent,
    },
    mounted() {
        this.getAuthenticatedUserId()
    },
    methods: {
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
                const response = await axios.get(`http://127.0.0.1:5000/api/painting/list/${userId}`);
                this.imageLinks = response.data;
                this.imageLinksFiltered = response.data;
            } catch (error) {
                console.error('Error al obtener la lista de enlaces', error);
            }
        },
        async deleteImage(imageId) {
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (user) {
                    const userId = user.uid;

                    await axios.delete(`http://127.0.0.1:5000/api/painting/delete/${imageId}`);

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