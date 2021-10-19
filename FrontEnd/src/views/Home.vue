<template>
    <navMenu/>
    <div class="album py-5 bg-light mt-5">
        <div class="container">
            <div class="row">
                <div v-for="post in posts" :key="post.id" class="col-md-4">
                    <div class="card mb-4 box-shadow borderBlue">
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
                                <div v-if="post.authorId == this.userId || this.role == 'ADMIN'" class="btn-group">
                                    <button class="btn btn-sm btn-outline-success" type="button"
                                            @click="modifierPost(post.id)">Modifier
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" type="button"
                                            @click="deletePost(post.id)">Supprimer
                                    </button>
                                </div>
                                <small class="text-muted">{{ post.comments.length }} Commentaire(s)</small>
                            </div>
                        </div>
                        <router-link :to="{ name: 'Profile', params: { id: post.authorId }}" class="unlink">
                            <div class="card-footer borderFooterRed bg-transparent text-start">
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
        modifierPost(idPost) {
            router.push({name: 'EditPost', params: {id: idPost}});
        },
        deletePost(idPost) {
            if (confirm("Voulez vous vraiment supprimer ce post ?")) {
                axios.delete('http://localhost:3000/api/post/' + idPost)
                    .then((res) => {
                        console.log(res.data);
                        alert("Post supprimé avec succès !");
                        this.$router.go();
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

.unlink {
    text-decoration: none;
    color: inherit;
}

.card {
    border: 1px solid #091f43;
}

.borderFooterRed {
    border-top: 1px solid #cf505a;
}

hr {
    color: #cf505a;
}

</style>
