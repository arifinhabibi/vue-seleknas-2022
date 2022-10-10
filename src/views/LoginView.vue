<template>
    <div>

        <NavbarComponent />
        <main>
            <!-- S: Header -->
            <header class="jumbotron">
                <div class="container text-center">
                    <h1 class="display-4">Job Seekers Platform</h1>
                </div>
            </header>
            <!-- E: Header -->

            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <form class="card card-default" @submit.prevent="login()">
                            <div class="card-header">
                                <h4 class="mb-0">Login</h4>
                            </div>
                            <div class="card-body">
                                <div class="form-group row align-items-center">
                                    <div class="col-4 text-right">ID Card Number</div>
                                    <div class="col-8"><input type="text" v-model="id_card_number" class="form-control"></div>
                                </div>
                                <div class="form-group row align-items-center">
                                    <div class="col-4 text-right">Password</div>
                                    <div class="col-8"><input type="password" v-model="password" class="form-control"></div>
                                </div>
                                <div class="form-group row align-items-center mt-4">
                                    <div class="col-4"></div>
                                    <div class="col-8"><button class="btn btn-primary">Login</button></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>

        <FooterComponent />

    </div>
</template>

<script>

import FooterComponent from '@/components/FooterComponent.vue';
import NavbarComponent from '@/components/NavbarComponent.vue';
import axios from 'axios';

    export default {
    name: "LoginView",
    components: { FooterComponent, NavbarComponent },
    data(){
        return {
            id_card_number: null,
            password: null
        }
    },
    methods: {
        login(){
            axios.post(`http://127.0.0.1:8000/api/v1/auth/login`, {
                id_card_number: this.id_card_number,
                password: this.password
            }).then(
                response => {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('name', response.data.name)

                    this.$router.push('/')
                }
            ).catch(
                error => {
                    alert(error.response.data.message)
                }
            )
        }
    },
    mounted(){
        const token = localStorage.getItem('token')

        if (token != null) {
            this.$router.push('/')
        }
    }
}
</script>