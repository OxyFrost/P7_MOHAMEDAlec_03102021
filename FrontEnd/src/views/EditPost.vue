<template>
    <NavMenu/>
    <div class="container flex-grow-1 container-p-y pt-5 mt-5 mb-5">
        <div class="card mb-4">
            <h2 class="my-2">Modification du Post</h2>
            <div class="card-body">
                <form @submit.prevent>
                    <div class="mb-3">
                        <label for="pseudo" class="form-label">Titre</label>
                        <input type="text" v-model="data.title" id="pseudo" class="form-control" placeholder="Mon plus beau poème !">
                    </div>
                    <div class="mb-3">
                        <label for="pseudo" class="form-label">Message </label>
                        <textarea v-model="data.message" id="message" class="form-control" placeholder="Je suis un message trop cool !"></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="image" class="form-label">Image</label>
                        <input type="file" @change="handleFileUpload" id="image" class="form-control" placeholder="Image.png">
                        <img v-if="this.imgURL !== null" alt="Image du Post" class="formImg my-5" v-bind:src="this.imgURL"/>
                    </div>

                    <button class="btn btn-lg btn-secondary m-2">Retour</button>
                    <button class="btn btn-lg btn-primary m-2" type="submit" @click="updatePost()">Modifier le Post</button>
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
    name: "EditPost",
    components:{Footer, NavMenu},
    data() {
        return {
            data: {
                title: null,
                message: null,
                image: null,
            },
            imgURL: null,
        }
    },
    methods:{
        getPostInfos(){
            const postId = this.$route.params.id;
            axios.get("http://localhost:3000/api/post/" + postId)
                .then((res) => {
                    console.log(res.data);
                    this.data.title = res.data.title;
                    this.data.message = res.data.message;
                    this.imgURL = res.data.imgURL;
                    console.log(this.imgURL);
                })
                .catch(() => {

                })
        },
        updatePost() {
            let formData = new FormData();

            formData.append('title', this.data.title);

            if(this.data.message !== null && this.data.message !== ""){
                formData.append('message', this.data.message);
            }

            if(this.data.image !== null && this.data.image !== ""){
                formData.append('image', this.data.image, this.data.image.name);
            }

            let postId = this.$route.params.id
            axios.put("http://localhost:3000/api/post/" + postId, formData)
                .then(() => {
                    alert("Post modifié avec succès !");
                    router.push({ name: 'Post', params: { id: postId } });
                })
                .catch(() => {

                })

        },
        handleFileUpload(event){
            console.log(event);
            this.data.image = event.target.files[0];
        },
    },
    created() {
        this.getPostInfos();
    }
}
</script>

<style scoped>
.formImg{
    width: 100%;
    height: 100%;
}
</style>