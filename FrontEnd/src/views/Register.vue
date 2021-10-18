<template>
    <main class="form-signin">
        <form method="post" @submit.prevent>
            <img alt="Logo Groupomania" class="mb-4" src="@/assets/img/icon-above-font.svg">
            <h1 class="h3 mb-3 fw-normal">Inscription</h1>

            <div class="form-floating">
                <input id="floatingPseudo" v-model="data.pseudo" class="form-control" placeholder="RandomNickName"
                       required
                       type="text">
                <label for="floatingPseudo">Pseudo</label>
            </div>
            <div class="form-floating">
                <input id="floatingEmail" v-model="data.email" class="form-control" placeholder="name@example.com"
                       required
                       type="email">
                <label for="floatingEmail">Adresse Mail</label>
            </div>
            <div class="form-floating">
                <input id="floatingPassword" v-model="data.password" class="form-control" placeholder="password"
                       required
                       type="password">
                <label for="floatingPassword">Mot de Passe</label>
            </div>

            <button class="w-100 btn btn-lg btn-primary mt-2" type="submit" @click="createAccount">S'inscrire</button>
            <p class="mt-5 mb-3 text-muted">Vous avez déjà un compte ?
                <router-link to="/">Se connecter ici</router-link>
            </p>
        </form>
    </main>
</template>

<script>
import * as Vue from 'vue' // in Vue 3
import axios from 'axios';
import VueAxios from 'vue-axios'

const app = Vue.createApp();
app.use(VueAxios, axios)

export default {
    name: "Register",
    data() {
        return {
            data: {
                pseudo: null,
                email: null,
                password: null,
            }
        }
    },
    methods: {
        createAccount() {
            const post = {
                pseudo: this.data.pseudo,
                email: this.data.email,
                password: this.data.password
            }

            axios.post("http://localhost:3000/api/user/signup", post)
                .then((res) => {
                    console.log(res);
                    alert("Utilisateur enregistré ! Veuillez vous connecter");
                    this.$router.push({
                        name: 'Login',
                        params: {message: res.data.message}
                    });
                })
                .catch(err => {
                    err.message
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

.form-signin input[type="text"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>