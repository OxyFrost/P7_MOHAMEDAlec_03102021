<template>
    <NavMenu/>
    <div class="container flex-grow-1 container-p-y pt-5 mt-5">
        <div class="card mb-4">
            <div class="card-body">
                <form @submit.prevent>
                    <div class="mb-3">
                        <label for="pseudo" class="form-label">Pseudo</label>
                        <input type="text" v-model="data.pseudo" id="pseudo" class="form-control" placeholder="Georges34">
                    </div>
                    <div class="mb-3">
                        <label for="image" class="form-label">Avatar</label>
                        <input type="file" @change="handleFileUpload" id="image" class="form-control" placeholder="Image.png">
                    </div>
                    <button class="btn btn-lg btn-secondary m-2">Retour</button>
                    <button class="btn btn-lg btn-primary m-2" type="submit" @click="updateProfil">Modifier le profil</button>
                </form>
            </div>
            <hr class="border-light m-0">
        </div>
    </div>
    <Footer/>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import axios from "axios";
import router from "@/router";
import Footer from "@/components/Footer";

export default {
    name: "EditProfile",
    components: {Footer, NavMenu},
    data() {
        return {
            data: {
                pseudo: null,
                image: null,
            }
        }
    },
    methods: {

        updateProfil() {
            console.log(this.data.image);
            let formData = new FormData();

            if(this.data.pseudo !== null && this.data.pseudo !== ""){
                formData.append('pseudo', this.data.pseudo);
            }

            if(this.data.image !== null && this.data.image !== ""){
                formData.append('image', this.data.image, this.data.image.name);
            }

            let userId = this.$route.params.id
            axios.put("http://localhost:3000/api/user/" + userId, formData)
                .then(() => {
                    alert("Profil modifié avec succès !");
                    router.push({ name: 'Profile', params: { id: userId } });
                })
                .catch(() => {

                })

        },
        handleFileUpload(event){
            console.log(event);
            this.data.image = event.target.files[0];
        },
    }
}
</script>

<style scoped>

</style>