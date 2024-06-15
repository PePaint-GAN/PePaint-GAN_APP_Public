<template>
    <NavbarComponent/>
    <h1 class="m-3" style="font-weight: bold; color: #FF3131;">Generación de Pinturas</h1>
    <div class="container-fluid ms-3" style="margin: 0;">
        
        <div class="row">
            <div class="col-md-2">
                <h5 style="font-weight: bold; color: #FF3131;">Configuración de Generación</h5>
                <div class="mb-3">
                    <label for="combo1" class="form-label">Estilo</label>
                    <select class="form-select" id="combo1" v-model="selectedModel">
                        <option value="Colonial">Colonial</option>
                        <option value="Republicano">Republicano</option>
                        <option value="Moderno">Moderno</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="combo2" class="form-label">Número de Pinturas</label>
                    <select class="form-select" id="combo2" v-model="selectedNumber">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div v-if="selectedModel">
                    <label class="form-label">Descripción:</label>
                    <p class="style-description">{{ estiloDescripcion }}</p>
                </div>
            </div>
            <div class="col-md-7 d-flex align-items-center ms-3" style="background-color: #B9AC92; height: 400px;">
                <div v-if="!imageSrcs && loading" class="col-12 d-flex justify-content-center align-items-center" style="height: 100%;">
                    <img src="../assets/loading.gif" alt="Cargando..."/>
                </div>
                <div v-else class="col-12 d-flex justify-content-center align-items-center" style="height: 100%;">
                    <div v-for="(imageSrc, index) in imageSrcs" :key="index" class="mx-5">
                        <img v-if="imageSrc" :src="imageSrc" :alt="'Image ' + (index + 1)" class="img-fluid my-3" style="max-height: 400px; max-width: 100%;">
                    </div>
                </div>
            </div>
            <div class="col-md-2" v-if="imageSrcs && imageSrcs.length > 0">
                <button v-for="(imageSrc, index) in imageSrcs" :key="index" class="btn btn-primary mb-3" style="background-color: #FF3131; border-color: #FF3131;" @click="guardarImagen(index)">
                    Guardar Pintura {{ index + 1 }}
                </button>
                <p v-if="boolean" class="alert alert-success">
                    {{ imagenGuardada }} guardada correctamente
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mt-3">
                <button class="btn btn-primary" :disabled="!selectedModel" style="background-color: #FF3131; border-color: #FF3131;" @click="generarImagen">
                    Generar Estilo {{ selectedModel || '' }}
                </button>
            </div>
        </div>
    </div>
    <FooterComponent/>
</template>


<script>
import NavbarComponent from '@/shared/NavbarComponent.vue';
import FooterComponent from '@/shared/FooterComponent.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';

export default {
    name: 'GenerationView',
    data() {
        return {
            imageSrcs: null,
            loading: false,
            boolean: false,
            imagenGuardada: '',
            selectedModel: null,
            selectedNumber: 1,
        };
    },
    components: {
        NavbarComponent,
        FooterComponent
    },
    mounted() {
        this.validarCampos();
    },
    computed: {
        estiloDescripcion() {
            const styleDescriptions = {
                Colonial: 'Arte peruano durante la colonización española, con influencias europeas y americanas. Caracterizado por iglesias ornamentadas y pintura religiosa.',
                Republicano: 'Arte peruano en la época de la independencia y la república. Combina elementos coloniales con influencias neoclásicas y eclécticas.',
                Moderno: 'Arte peruano del siglo XX con enfoque en la experimentación y la abstracción, influenciado por movimientos artísticos contemporáneos.',
            };
            return this.selectedModel ? styleDescriptions[this.selectedModel] : '';
        }
    },
    methods: {
        validarCampos() {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (!user) {
                    this.$router.push('/SignIn');
                }
            });
        },
        generarImagen() {
            if (this.loading || !this.selectedModel) return;

            this.imageSrcs = null;
            this.loading = true;
            this.boolean = false;

            // Crea un objeto con el nombre del modelo seleccionado
            const requestData = {
                modelName: this.selectedModel,
                numImages: this.selectedNumber,
            };

            // Realiza una solicitud POST a la API Flask para generar imágenes
            axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/painting/generate_images/` + this.selectedModel, requestData)
                .then((response) => {
                    // Obtiene las URLs de las imágenes generadas desde la respuesta de la API
                    const imageUrls = response.data.image_urls;
                    console.log(imageUrls)
                    
                    // Asigna las URLs a las variables imageSrc1 e imageSrc2
                    this.imageSrcs = imageUrls;
                    this.loading = false;
                })
                .catch((error) => {
                    console.error('Error al generar las imágenes:', error);
                });
        },
        guardarImagen(opcion) {
            const paintingData = {
                user_id: getAuth().currentUser.uid,
                create_date: new Date().toLocaleDateString(),
                image_url: this.imageSrcs[opcion],
            }

            axios.post(`${process.env.VUE_APP_BACKEND_URL}/api/painting/add`, paintingData)
                .then(response => {
                    this.imagenGuardada = "Pintura " + (opcion + 1);

                    this.boolean = true;
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
}
</script>

<style scoped>
.style-description {
  background-color: #f8f9fa; /* Color de fondo del recuadro */
  padding: 10px; /* Espaciado interior del recuadro */
  border: 1px solid #ccc; /* Borde del recuadro */
  border-radius: 5px; /* Bordes redondeados */
  margin-top: 10px; /* Espaciado superior */
  text-align: justify;
}

.style-description p {
  /* Estilos para el texto de descripción */
  font-size: 14px;
  color: #333;
  
}
</style>