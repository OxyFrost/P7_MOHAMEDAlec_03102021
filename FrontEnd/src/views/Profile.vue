<template>
    <NavMenu/>
    <div class="container flex-grow-1 container-p-y pt-5 my-5">

        <div class="media align-items-center py-3 mb-3">
            <img alt="" class="profilAvatar rounded-circle" v-bind:src="this.user.imgURL">
            <div class="media-body ml-4">
                <h4 class="font-weight-bold mb-2">{{ this.user.pseudo }}</h4>
                <button v-if="this.userId === this.$route.params.id" class="btn btn-primary btn-sm"
                        @click="editProfile(this.user.id)">Modifier Profil
                </button>&nbsp;
                <button v-if="this.userId === this.$route.params.id" class="btn btn-danger btn-sm" @click="logout()">Se
                    déconnecter
                </button>&nbsp;
            </div>
        </div>

        <div class="card mb-4">
            <div class="card-body">
                <table class="table user-view-table m-0">
                    <tbody>
                    <tr>
                        <td>Inscription :</td>
                        <td>{{ this.createdAt }}</td>
                    </tr>
                    <tr>
                        <td>Role :</td>
                        <td>{{ this.user.role }}</td>
                    </tr>
                    <tr>
                        <td>Etat :</td>
                        <td v-if="this.user.deletedAt == null">Compte Actif</td>
                        <td v-else>Compte Inactif</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <hr class="border-light m-0">
        </div>

        <div class="card">
            <div class="row no-gutters row-bordered">
                <div class="d-flex col-md align-items-center">
                    <div class="card-body d-block text-body">
                        <div class="text-muted small line-height-1">Posts</div>
                        <div class="text-xlarge">{{ this.nbPosts }}</div>
                    </div>
                </div>
                <div class="d-flex col-md align-items-center">
                    <div class="card-body d-block text-body">
                        <div class="text-muted small line-height-1">Commentaires</div>
                        <div class="text-xlarge">{{ this.nbComments }}</div>
                    </div>
                </div>
            </div>
            <hr class="border-light m-0">
            <div class="card-body">

                <table class="table user-view-table m-0">
                    <tbody>
                    <tr>
                        <td>E-mail:</td>
                        <td>{{ this.user.email }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <button v-if="this.userId === this.$route.params.id" class="btn btn-danger mb-5 mt-3"
                @click="deleteAccount(this.user.id)">Supprimer le compte
        </button>
    </div>
    <Footer/>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import * as Vue from 'vue' // in Vue 3
import axios from 'axios';
import VueAxios from 'vue-axios'
import router from "@/router";
import Footer from "@/components/Footer";

const app = Vue.createApp();
app.use(VueAxios, axios)

export default {
    name: "Profile",
    components: {Footer, NavMenu},
    data() {
        return {
            user: [],
            createdAt: null,
            nbPosts: 0,
            nbComments: 0,
            userId: sessionStorage.getItem('userId'),
            loop: 0,
        }
    },
    methods: {
        getUserInfos() {
            let userInfo = this.$route.params.id
            axios.get('http://localhost:3000/api/user/' + userInfo)
                .then(res => {
                    console.log(res.data);
                    this.user = res.data;
                    let date = new Date(this.user.createdAt);
                    this.nbPosts = this.user.posts.length;
                    this.nbComments = this.user.comments.length;
                    this.createdAt = date.getUTCDay() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear()
                        + ' à ' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds();
                }).catch((err) => {
                if ((err.response.status === 401 || err.response.status === 403) && this.loop == 0) {
                    this.loop++;
                    this.refreshToken();
                    return this.getUserInfos();
                }
            })

        },
        logout() {
            if (confirm("Voulez vous vraiment vous déconnecter ?")) {
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('role');
                sessionStorage.removeItem('token');
                delete axios.defaults.headers.common["Authorization"];
                router.push({name: 'Login'});
            }
        },
        editProfile(idUser) {
            router.push({name: 'EditProfile', params: {id: idUser}});
        },
        deleteAccount(idUser){
            if (confirm("Etes vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et il faudra contacter un administrateur pour pouvoir le débloquer.")) {
                axios.delete('http://localhost:3000/api/user/' + idUser)
                    .then(res => {
                        console.log(res.data);
                        sessionStorage.removeItem('userId');
                        sessionStorage.removeItem('role');
                        sessionStorage.removeItem('token');
                        delete axios.defaults.headers.common["Authorization"];
                        router.push({name: 'Login'});
                    }).catch((err) => {
                        console.log(err.message);
                    });
            }
        },
        refreshToken() {
            let token = sessionStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            } else {
                delete axios.defaults.headers.common["Authorization"];
                router.push({name: 'Login'});
            }
        }
    },
    created() {
        this.getUserInfos();
    }
}
</script>

<style scoped>
body {
    margin-top: 20px;
}

.profilAvatar {
    width: 150px !important;
    height: 150px;
}

.card {
    background-clip: padding-box;
    box-shadow: 0 1px 4px rgba(24, 28, 33, 0.012);
}

.user-view-table td:first-child {
    width: 9rem;
}

.user-view-table td {
    padding-right: 0;
    padding-left: 0;
    border: 0;
}

.card .row-bordered > [class*=" col-"]::after {
    border-color: rgba(24, 28, 33, 0.075);
}

.text-xlarge {
    font-size: 170% !important;
}
</style>