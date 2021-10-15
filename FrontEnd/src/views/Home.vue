<template>
  <navMenu/>
  <div class="album py-5 bg-light mt-5">
    <div class="container">
      <div class="row">
        <div v-for="post in posts" :key="post.id" class="col-md-4">
          <div class="card mb-4 box-shadow">
            <img v-if="post.imgURL !== null" alt="Image du Post" class="card-img-top cardImg"
                 v-bind:src="post.imgURL">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p v-if="post.imgURL == null" class="card-text">{{ post.message }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-secondary" type="button">Lire</button>
                  <button v-if="post.authorId == this.userId || this.role == 'ADMIN'"
                          class="btn btn-sm btn-outline-danger" type="button" @click="deletePost(post.id)">Supprimer
                  </button>
                </div>
                <small class="text-muted">{{ post.comments.length }} Commentaire(s)</small>
              </div>
            </div>
            <router-link class="unlink" :to="{ name: 'Profile', params: { id: post.author.id }}">
            <div class="card-footer bg-transparent text-start">
              <img alt="Image du Post" class="card-img-top profilePic" v-bind:src="post.author.imgURL">
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
    }
  },
  methods: {
    getAllPosts() {
      axios.get('http://localhost:3000/api/post/')
          .then(res => {
            console.log(res.data);
            this.posts = res.data;
          })


    },
    deletePost(idPost) {
      if (confirm("Voulez vous vraiment supprimer ce post ?")) {
        axios.delete('http://localhost:3000/api/post/', {params: {id: idPost}})
          .then((res) => {
              console.log(res.data);
          })
      }
    }
  }
  ,
  mounted() {
    this.getAllPosts();
  }
}
</script>


<style scoped>

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

.unlink{
  text-decoration: none;
  color: inherit;
}

</style>
