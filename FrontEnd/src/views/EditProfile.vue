<template>
    <NavMenu/>
    <div class="container flex-grow-1 container-p-y pt-5 mt-5">
        <div class="card mb-4">
            <div class="card-body">
                <form>
                    <div class="mb-3">
                        <label for="pseudo" class="form-label">Pseudo</label>
                        <input type="email" id="pseudo" class="form-control" placeholder="name@example.com">
                    </div>
                    <div class="mb-3">
                        <label for="image" class="form-label">Avatar</label>
                        <input type="file" id="image" class="form-control" placeholder="name@example.com">
                    </div>
                    <button class="btn btn-lg btn-primary mt-2" type="submit" @click="login">Modifier le profil</button>
                </form>
            </div>
            <hr class="border-light m-0">
        </div>
    </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";
export default {
    name: "EditProfile",
    components: {NavMenu}
}
</script>

<style scoped>

</style>