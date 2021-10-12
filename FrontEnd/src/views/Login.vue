<template>
  <main class="form-signin">
    <form>
      <img alt="Logo Groupomania" class="mb-4" src="../assets/icon-above-font.svg">
      <h1 class="h3 mb-3 fw-normal">Connexion</h1>

      <div class="form-floating">
        <input id="floatingInput" class="form-control" placeholder="name@example.com" type="email">
        <label for="floatingInput">Adresse Mail</label>
      </div>
      <div class="form-floating">
        <input id="floatingPassword" class="form-control" placeholder="Password" type="password">
        <label for="floatingPassword">Mot de Passe</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary mt-2" type="submit">Se connecter</button>
      <p class="mt-5 mb-3 text-muted">Vous n'avez pas de compte ? <router-link to="/register">S'inscrire ici</router-link></p>
    </form>
  </main>
</template>

<script>
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
</style>