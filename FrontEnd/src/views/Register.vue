<template>
  <main class="form-signin">
    <form method="post" @submit.prevent>
      <img alt="Logo Groupomania" class="mb-4" src="@/assets/icon-above-font.svg">
      <h1 class="h3 mb-3 fw-normal">Inscription</h1>

      <div class="form-floating">
        <input id="floatingPseudo" v-model="pseudo" class="form-control" placeholder="RandomNickName" required
               type="text">
        <label for="floatingPseudo">Pseudo</label>
      </div>
      <div class="form-floating">
        <input id="floatingEmail" v-model="email" class="form-control" placeholder="name@example.com" required
               type="email">
        <label for="floatingEmail">Adresse Mail</label>
      </div>
      <div class="form-floating">
        <input id="floatingPassword" v-model="password" class="form-control" placeholder="password" required
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
export default {
  name: "Register",
  data() {
    return {
      pseudo: null,
      email: null,
      password: null,
    }
  },
  methods: {
    createAccount: function () {
      this.$store.dispatch('createAccount', {
        pseudo: this.pseudo,
        email: this.email,
        password: this.password
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