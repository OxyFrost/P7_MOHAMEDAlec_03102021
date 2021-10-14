<template>
  <navMenu/>
  <div class="album py-5 bg-light mt-5">
    <div class="container">
      <div class="row">
        <div v-for="post in posts" :key="post.id" class="col-md-4">
          <div class="card mb-4 box-shadow">
            <img alt="Card image cap" class="card-img-top"
                 v-bind:src="post.imgURL">
            <div class="card-body">
              <p class="card-text">{{ post.title }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button class="btn btn-sm btn-outline-secondary" type="button">View</button>
                  <button class="btn btn-sm btn-outline-secondary" type="button">Edit</button>
                </div>
                <small class="text-muted">{{ post.comments.length }} Commentaire</small>
              </div>
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
import  axios  from 'axios';
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
      posts:[]
    }
  },
  methods:{
    getAllPosts(){
      axios.get('http://localhost:3000/api/post/')
          .then( res => {
            console.log(res.data);
            this.posts = res.data;
          })
    }
  },
  mounted() {
    this.getAllPosts();
  }
}
</script>
