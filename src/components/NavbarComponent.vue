<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
            <div class="container">
                <router-link to="/" class="navbar-brand">Job Seekers Platform</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarsExampleDefault" v-if="token != null">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/" class="nav-link">{{ name }}</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click="logout()">Logout</a>
                        </li>
                    </ul>
                </div>


                <div class="collapse navbar-collapse" id="navbarsExampleDefault" v-if="token == null">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/login" class="nav-link">Login</router-link>
                        </li>
                    </ul>
                </div>


            </div>
        </nav>
    </div>
</template>

<script>
import axios from 'axios'


export default {
    name: 'NavbarComponent',
    data(){
      return {
        name: localStorage.getItem('name'),
        token: null
      }
    },
    methods: {
        logout(){
            const token = localStorage.getItem('token')
            axios.post(`http://127.0.0.1:8000/api/v1/auth/logout?token=${token}`).then(
                response => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('name')
                    this.$router.push('/login')
                    alert(response.data.message)
                }
            ).catch(
                error => {
                    alert(error.response.data.message)
                }
            )
        }
    },
    mounted(){
        const token  = localStorage.getItem('token')

        this.token = token
    }
}

</script>