<template>
    <div>

        <NavbarComponent />
        <main>
    <!-- S: Header -->
    <header class="jumbotron">
        <div class="container text-center">
            <div>
                <h1 class="display-4">{{ company }}</h1>
                <span class="text-muted">{{ address }}</span>
            </div>
        </div>
    </header>
    <!-- E: Header -->

    <div class="container">

        <div class="row mb-3">
            <div class="col-md-12">
                <div class="form-group">
                    <h3>Description</h3>
                    {{ description }}
                </div>
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-md-12">
                <div class="form-group">
                    <h3>Select position</h3>
                    <table class="table table-bordered table-hover table-striped">
                        <tr>
                            <th width="1">#</th>
                            <th>Position</th>
                            <th>Capacity</th>
                            <th>Application / Max</th>
                            <th rowspan="4" style="vertical-align: middle; white-space: nowrap;" width="1">
                                <button class="btn btn-primary btn-lg" @click="applyJob()">Apply for this job</button>
                            </th>
                        </tr>
                      
                        <tr v-for="positions in available_position" v-bind:key="positions">
                            <td><input type="checkbox" v-model="choose_job" :value="positions.position"></td>
                            <td>{{ positions.position }}</td>
                            <td>{{ positions.capacity }}</td>
                            <td>3/{{ positions.apply_capacity }}</td>
                        </tr>
                        <!-- <tr class="table-warning">
                            <td><input type="checkbox" disabled></td>
                            <td>Manager</td>
                            <td>1</td>
                            <td>22/22</td>
                        </tr> -->
                    </table>
                </div>
            </div>

            <div class="col-md-12">
                <div class="form-group">
                    <div class="d-flex align-items-center mb-3">
                        <label class="mr-3 mb-0">Notes for Company</label>
                    </div>
                    <textarea v-model="notes" class="form-control" cols="30" rows="6"
                        placeholder="Explain why you should be accepted"></textarea>
                </div>
            </div>
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
    name: "ApplyJobView",
    components: { NavbarComponent, FooterComponent },
    data(){
        return {
            company: null,
            address: null,
            description: null,
            available_position: [],
            id_vacancy: null,
            notes: null,
            choose_job: []
        }
    },
    methods: {
        getDataJobVacancy(vacancy_id, token){
            axios.get(`http://127.0.0.1:8000/api/v1/job_vacancies/${vacancy_id}?token=${token}`).then(
                response => {
                    console.log(response)
                    this.company = response.data.vacancy.company
                    this.address = response.data.vacancy.address
                    this.available_position = response.data.vacancy.available_position
                    this.description = response.data.vacancy.description
                    this.id_vacancy = response.data.vacancy.id
                }
            ).catch(
                error => {
                    console.log(error)
                    alert(error.response.data.message)
                }
                )
        },
        applyJob(){
            const token = localStorage.getItem('token')
            axios.post(`http://127.0.0.1:8000/api/v1/applications?token=${token}`, {
                vacancy_id: this.id_vacancy,
                positions: this.choose_job,
                notes: this.notes
            }).then(
                response => {
                    // console.log(response)
                    alert(response.data.message)
                    this.$router.push('/')
                }
                ).catch(
                    error => {
                    // console.log(error)
                    alert(error.response.data.message)
                }
            )
        }
    },
    mounted(){
        const token = localStorage.getItem('token')

        const vacancy_id = this.$route.query.vacancy_id

        if (token == null) {
            this.$router.push('/login')
        } else {
            this.getDataJobVacancy(vacancy_id, token)
        }
    }
}
</script>