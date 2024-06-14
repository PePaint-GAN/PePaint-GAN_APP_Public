import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import VueSplide from '@splidejs/vue-splide';
import { initializeApp } from "firebase/app"

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@splidejs/vue-splide/css';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomeView from './views/HomeView.vue'
import GenerationView from './views/GenerationView.vue'
import SignInView from './views/SignInView.vue'
import SignUpView from './views/SignUpView.vue'
import GalleryView from './views/GalleryView.vue'
import SettingsView from './views/SettingsView.vue'
import ContactView from './views/ContactView.vue'
import LearningView from './views/LearningView.vue'

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/generation',
        name: 'Generation',
        component: GenerationView
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignInView
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUpView
    },
    {
        path: '/gallery',
        name: 'Gallery',
        component: GalleryView
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsView
    },
    {
        path: '/contact',
        name: 'Contact',
        component: ContactView
    },
    {
        path: '/learning',
        name: 'Learning',
        component: LearningView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.use(VueSplide);

app.mount('#app');
