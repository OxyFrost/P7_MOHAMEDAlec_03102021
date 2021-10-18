<template>
    <navMenu/>
    <section class="py-5 text-center container">
        <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
                <h1 class="fw-light">Album example</h1>
                <p class="">Something short and leading about the collection below—its contents, the
                    creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it
                    entirely.</p>
                <p>
                    <a class="btn btn-primary my-2" href="#">Main call to action</a>
                    <a class="btn btn-secondary my-2" href="#">Secondary action</a>
                </p>
            </div>
        </div>
    </section>
    <div class="album py-5 bg-light mt-5">
        <div class="container">
            <div class="row">
                <div v-for="post in posts" :key="post.id" class="col-md-4">
                    <div class="card mb-4 box-shadow">
                        <router-link :to="{ name: 'Post', params: { id: post.id }}" class="unlink">
                            <img v-if="post.imgURL !== null" alt="Image du Post" class="card-img-top cardImg"
                                 v-bind:src="post.imgURL">
                        </router-link>
                        <div class="card-body">
                            <router-link :to="{ name: 'Post', params: { id: post.id }}" class="unlink">
                                <h5 class="card-title">{{ post.title }}</h5>
                                <p v-if="post.imgURL == null" class="card-text">{{ post.message }}</p>
                            </router-link>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button v-if="post.authorId == this.userId || this.role == 'ADMIN'"
                                            class="btn btn-sm btn-outline-danger" type="button"
                                            @click="deletePost(post.id)">Supprimer
                                    </button>
                                </div>
                                <small class="text-muted">{{ post.comments.length }} Commentaire(s)</small>
                            </div>
                        </div>
                        <router-link :to="{ name: 'Profile', params: { id: post.authorId }}" class="unlink">
                            <div class="card-footer bg-transparent text-start">
                                <img alt="Image du Post" class="card-img-top profilePic"
                                     v-bind:src="post.author.imgURL">
                                <span class="text-muted m-2 align-text-top">{{ post.author.pseudo }}</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import * as Vue from 'vue' // in Vue 3
import axios from 'axios';
import VueAxios from 'vue-axios'
import router from "@/router";

const app = Vue.createApp();
app.use(VueAxios, axios)

export default {
    name: 'Home',
    components: {
        NavMenu,
    },
    data() {
        return {
            posts: [],
            role: sessionStorage.getItem('role'),
            userId: sessionStorage.getItem('userId'),
            boucle: 0,
        }
    },
    methods: {
        getAllPosts() {

            axios.get('http://localhost:3000/api/post/')
                .then(res => {
                    this.posts = res.data;
                }).catch((err) => {
                if ((err.response.status === 401 || err.response.status === 403) && this.boucle === 0) {
                    this.boucle++;
                    this.refreshToken();
                    return this.getAllPosts();
                }
            })


        },
        deletePost(idPost) {
            if (confirm("Voulez vous vraiment supprimer ce post ?")) {
                axios.delete('http://localhost:3000/api/post/' + idPost)
                    .then((res) => {
                        console.log(res.data);
                        this.$router.go();
                    })
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
    }
    ,
    mounted() {
        this.getAllPosts();
    }
}
</script>


<style>

.cardImg {
    height: 250px;
    object-fit: cover;
}

.profilePic {
    height: 25px;
    width: 25px;
    object-fit: cover;
    border-radius: 90px;
}

.unlink, .unlink:hover {
    text-decoration: none;
    color: inherit;
}

</style>
