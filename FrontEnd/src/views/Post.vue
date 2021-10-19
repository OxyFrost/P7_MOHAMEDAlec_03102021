<template>
    <navMenu/>
    <div class="py-5 my-5 container">
        <div v-if="this.post !== []" class="row justify-content-center">
            <div class="col-lg-6 col-12 card px-0">
                <h1>{{ this.post.title }}</h1>
                <router-link :to="{ name: 'Profile', params: { id: post.authorId }}" class="unlink">
                    <span>Par {{ this.post.author.pseudo }}</span>
                </router-link>
                <div v-if="this.post.authorId == this.userId || this.role == 'ADMIN'" class="btn-group mx-5 my-2">
                    <button class="btn btn-sm btn-outline-success" type="button" @click="modifierPost(this.post.id)">Modifier</button>
                    <button class="btn btn-sm btn-outline-danger" type="button" @click="deletePost(this.post.id)">Supprimer</button>
                </div>
                <div v-if="this.post.imgURL !== null">
                    <img v-bind:src="this.post.imgURL"  class="img-responsive imgContainer">
                </div>
                <div v-if="this.post.message !== null">
                    <hr>
                    <p>{{ this.post.message }}</p>
                </div>
                <br/>
                <!-- the comment box -->
                    <h4>Laisser un Commentaire:</h4>
                    <form role="form" @button.prevent>
                        <div class="form-group">
                            <textarea v-model="this.data.message" class="form-control" rows="3"></textarea>
                        </div>
                        <button class="btn btn-primary my-2" @click="createComment(this.post.id)">Commenter</button>
                    </form>

                <!-- the comments -->
                <div v-for="comment in this.comments" :key="comment.id">
                    <hr/>
                    <div class="well">
                        <router-link :to="{ name: 'Profile', params: { id: comment.authorId }}" class="unlink">
                            <h5>{{ comment.author.pseudo }} :</h5>
                        </router-link>
                        <span>{{ comment.message }}</span>
                        <div v-if="this.post.authorId == this.userId || this.role == 'ADMIN'">
                            <span @click="modifierComment(comment.id,comment.message)"><font-awesome-icon class="mx-2" :icon="['fa', 'edit']"/></span>
                            <span @click="deleteComment(comment.id)"><font-awesome-icon class="mx-2" :icon="['fa', 'times']"/></span>
                        </div>
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
    name: "Post",
    components: {NavMenu},
    data(){
        return {
            post: null,
            comments:[],
            userId: sessionStorage.getItem('userId'),
            role: sessionStorage.getItem('role'),
            loop:0,
            data: {
                message: null,
            }
        }
    },
    methods:{
        getPostInfos(){
            const postId = this.$route.params.id;
            axios.get('http://localhost:3000/api/post/' + postId)
                .then(res => {
                    this.post = res.data;
                }).catch((err) => {
                    console.log(err.message);
                })

            axios.get('http://localhost:3000/api/post/' + postId + '/comment')
                .then(res => {
                    this.comments = res.data;
                    console.log(res.data);
                }).catch((err) => {
                if ((err.response.status === 401 || err.response.status === 403) && this.loop == 0) {
                    this.loop++;
                    this.refreshToken();
                    return this.getPostInfos();
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
                        router.push({name: 'Home'});
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            }
        },
        modifierComment(idComment, message) {
            const idPost = this.$route.params.id;
            let newComment = prompt("Modifier votre commentaire : ", message);

            let data = {
                message: newComment,
            }
            axios.put('http://localhost:3000/api/post/' + idPost + '/comment/' + idComment, data)
                .then(() => {
                    alert("Commentaire modifié avec succès !");
                    this.$router.go();
                })
                .catch((err) => {
                    console.log(err.message);
                })
            console.log(idComment,idPost,newComment);
        },
        deleteComment(idComment) {
            const idPost = this.$route.params.id;
            if (confirm("Voulez vous vraiment supprimer ce commentaire ?")) {
                axios.delete('http://localhost:3000/api/post/' + idPost + '/comment/' + idComment)
                    .then(() => {
                        alert("Commentaire supprimé avec succès !");
                        this.$router.go();
                    })
                    .catch((err) => {
                        console.log(err.message);
                    })
            }
        },
        createComment(idPost) {

            axios.post('http://localhost:3000/api/post/' + idPost + '/comment', this.data)
                .then((res) => {
                    console.log(res.data);
                    alert("Commentaire ajouté avec succès !");
                    this.$router.go();
                })
                .catch((err) => {
                    console.log(err.message);
                })
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
        this.getPostInfos();
    }
}
</script>

<style scoped>

.imgContainer{
    width: 100%;
    height: 100%;
}
</style>