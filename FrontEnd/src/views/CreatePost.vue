<template>
    <NavMenu/>
    <div class="container flex-grow-1 container-p-y pt-5 mt-5">
        <div class="card mb-4">
            <h2 class="my-2">Création d'un Post</h2>
            <div class="card-body">
                <form @submit.prevent>
                    <div class="mb-3">
                        <label class="form-label" for="pseudo">Titre</label>
                        <input id="pseudo" v-model="data.title" class="form-control" placeholder="Mon plus beau poème !"
                               type="text">
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="pseudo">Message </label>
                        <textarea id="message" v-model="data.message" class="form-control"
                                  placeholder="Je suis un message trop cool !"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="image">Image</label>
                        <input id="image" class="form-control" placeholder="Image.png" type="file"
                               @change="handleFileUpload">
                    </div>
                    <button class="btn btn-lg btn-secondary m-2">Retour</button>
                    <button class="btn btn-lg btn-primary m-2" type="submit" @click="createPost()">Créer le Post
                    </button>
                </form>
            </div>
            <hr class="border-light m-0">
        </div>
    </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";
import axios from "axios";
import router from "@/router";

export default {
    name: "CreatePost",
    components:{NavMenu},
    data() {
        return {
            data: {
                title: null,
                message: null,
                image: null,
            }
        }
    },
    methods:{
        createPost() {
            let formData = new FormData();

            formData.append('authorId', sessionStorage.getItem('userId'));
            formData.append('title', this.data.title);

            if(this.data.message !== null && this.data.message !== ""){
                formData.append('message', this.data.message);
            }

            if(this.data.image !== null && this.data.image !== ""){
                formData.append('image', this.data.image, this.data.image.name);
            }

            axios.post("http://localhost:3000/api/post", formData)
                .then(() => {
                    alert("Post Créer avec succès !");
                    router.push({ name: 'Home'});
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