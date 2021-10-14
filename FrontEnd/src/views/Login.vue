<template>
  <main class="form-signin">
    <form method="post" @submit.prevent>
      <img alt="Logo Groupomania" class="mb-4" src="../assets/icon-above-font.svg">
      <h1 class="h3 mb-3 fw-normal">Connexion</h1>

      <p class="message">{{ message }}</p>

      <div class="form-floating">
        <input v-model="data.email" id="floatingInput" class="form-control" placeholder="name@example.com" type="email" required>
        <label for="floatingInput">Adresse Mail</label>
      </div>
      <div class="form-floating">
        <input v-model="data.password" id="floatingPassword" class="form-control" placeholder="Password" type="password" required>
        <label for="floatingPassword">Mot de Passe</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary mt-2" type="submit" @click="login">Se connecter</button>
      <p class="mt-5 mb-3 text-muted">Vous n'avez pas de compte ? <router-link to="/register">S'inscrire ici</router-link></p>
    </form>
  </main>
</template>

<script>
import * as Vue from 'vue' // in Vue 3
import  axios  from 'axios';
import VueAxios from 'vue-axios'

const app = Vue.createApp();
app.use(VueAxios, axios)

export default {
  name: "Register",
  data() {
    return {
      data: {
        email: null,
        password: null,
      },
      message:null,
    }
  },
  methods: {
    login(){
      const post = {
        email: this.data.email,
        password: this.data.password
      }

      console.log(post);
      axios.post("http://localhost:3000/api/user/login", post)
          .then((res) => {
            console.log(res.data);
            sessionStorage.setItem("token", res.data.token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
            this.$router.push("Home");
          })
          .catch((err) => {
            if(err.response.status === 401){
              this.message = "Email ou mot de passe Incorrect";
            }else if(err.response.status === 500) {
              this.message = "Problème serveur, veuillez contacter l'admin";
            }
            console.log(this.message);
          })

    }
  }
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.message{
  color: red;
}
</style>