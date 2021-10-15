// ./components/NavMenu.vue

<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid ">
            <a class="navbar-brand" href="#">
                <img class="logo" alt="Logo Groupomania" src="@/assets/icon-left-font-monochrome-white.svg">
            </a>
            <button aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
                    data-bs-target="#navbarCollapse" data-bs-toggle="collapse" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div id="navbarCollapse" class="collapse navbar-collapse ">
                <ul class="navbar-nav me-auto mb-2 mb-md-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/Home">Accueil</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                </ul>
                <router-link class="unlink" :to="{ name: 'Profile', params: { id: this.userId }}">
                    <span class="navbar-text">
                        <img class="profileNav" alt="Image Profile" v-bind:src="this.imgURL">
                        {{ this.pseudo }}
                    </span>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from "axios";

export default {
    name: 'NavMenu',
    data() {
        return {
            imgURL: null,
            pseudo:null,
            userId: sessionStorage.getItem('userId')
        }
    },
    methods: {
        getUser() {

            axios.get("http://localhost:3000/api/user/" + this.userId)
                .then((res) => {
                    console.log(res.data);
                    this.imgURL = res.data.imgURL;
                    this.pseudo = res.data.pseudo;
                })
                .catch(err => {
                    err.message
                })

        }
    },
    mounted(){
        this.getUser();
    }
}
</script>

<style scoped>
.logo{
    width: 140px;
}

.profileNav{
    width: 25px;
    height: 25px;
    object-fit: cover;
    border-radius: 90px;
}

.unlink{
    text-decoration: none;
    color: inherit;
}
</style>