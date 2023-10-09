<template>
    <div>
        <NavbarComponent/>

        <div class="container-fluid mt-3">
            <ImageSliderComponent/>
        </div>

        <div class="container mt-3 ms-0">
            <div class="row">
                <div class="col-md-auto">
                    <h1 class="display-1" style="font-weight: bold; color: #FF3131;">
                        Pe-PaintGAN
                    </h1>
                    <p class="fs-3">
                        Pe-PaintGAN es un modelo de IA que puede generar pinturas de estilo peruano a partir de un estilo determinado.
                    </p>
                    <router-link to="./Generation" class="btn btn-primary btn-transparent btn-hover">
                        Probar Pe-PaintGAN
                    </router-link>
                </div>
            </div>
        </div>
        
        <FooterComponent/>
    </div>
</template>

<script>
import NavbarComponent from './../shared/NavbarComponent.vue'
import FooterComponent from './../shared/FooterComponent.vue'
import ImageSliderComponent from './../components/ImageSliderComponent.vue'
// import axios from 'axios'

export default {
    name: 'HomeView',
    components: {
        NavbarComponent,
        FooterComponent,
        ImageSliderComponent,
    },
}
</script>

<style>
.btn-transparent {
    background-color: transparent !important;
    border-color: #FF3131 !important;
    border-width: 3.5px !important; /* Aumentamos el ancho del borde */
    color: #FF3131 !important;
    font-size: 18px !important; /* Aumentamos el tamaño de la letra */
    transition: all 0.3s ease !important;
    padding: 12px 24px !important; /* Ajustamos el padding */
}

/* Aplicamos estilos cuando el mouse está sobre el botón */
.btn-transparent:hover {
    background-color: #FF3131 !important;
    color: white !important;
}
</style>
