<template>
    <div>
        <NavbarComponent />
        <main>
            <!-- S: Header -->
            <header class="jumbotron">
                <div class="container">
                    <h1 class="display-4">Job Vacancies</h1>
                </div>
            </header>
            <!-- E: Header -->

            <div class="container mb-5">

                <div class="section-header mb-4">
                    <h4 class="section-title text-muted font-weight-normal">List of Job Vacancies</h4>
                </div>

                <div class="section-body">


                    <!-- <article class="spot unavailable">
                        <div class="row">
                            <div class="col-5">
                                <h5 class="text-primary">PT. Maju Mundur Sejahtera</h5>
                                <span class="text-muted">Ds. Abdullah No. 31, DKI Jakarta</span>
                            </div>
                            <div class="col-4">
                                <h5>Available Position (Capacity)</h5>
                                <span class="text-muted">Desain Grafis (3), Programmer (1), Manager (1)</span>
                            </div>
                            <div class="col-3">
                                <div class="bg-success text-white p-2">
                                    Vacancies have been submitted
                                </div>
                            </div>
                        </div>
                    </article> -->

                    <article v-for="vacancy in vacancies" v-bind:key="vacancy.id" class="spot">
                        <div class="row">
                            <div class="col-5">
                                <h5 class="text-primary">{{ vacancy.company }}</h5>
                                <span class="text-muted">{{ vacancy.address }}</span>
                            </div>
                            <div class="col-4">
                                <h5>Available Position ({{ vacancy.available_position.length == null ? '-' : vacancy.available_position.length }})</h5>
                                <span class="text-muted" v-for="positions in vacancy.available_position" v-bind:key="positions">
                                    {{ positions.position }} ({{ positions.capacity }}), 
                                </span>
                            </div>
                            <div class="col-3">
                                <button class="btn btn-danger btn-lg btn-block" @click="routeApplyJob(vacancy.id)">
                                    Detail / Apply
                                </button>
                            </div>
                        </div>
                    </article>
                   

                </div>

            </div>

        </main>

        <FooterComponent />
    </div>

</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import axios from 'axios';
    export default {
    name: "JobVacanciesView",
    components: { NavbarComponent, FooterComponent },
    data(){
        return {
            vacancies: [],
        }
    }, 
    methods: {
        getDataVacancies(token){
            axios.get(`http://127.0.0.1:8000/api/v1/job_vacancies?token=${token}`).then(
                response => {
                    console.log(response)
                    this.vacancies = response.data.vacancies
                }
            ).catch(
                error => {
                    console.log(error)
                    alert(error.response.data.message)
                }
            )
        },
        routeApplyJob(vacancy_id){
            this.$router.push({
                path: '/apply-job',
                query: {
                    vacancy_id: vacancy_id
                }
            })
        }
    },
    mounted(){
        const token = localStorage.getItem('token')

        if (token == null) {
            this.$router.push('/login')
        } else {
            this.getDataVacancies(token)
        }
    }
}
</script>