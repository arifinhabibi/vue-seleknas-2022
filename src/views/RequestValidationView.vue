<template>
    <div>

        <NavbarComponent />

        <main>
            <!-- S: Header -->
            <header class="jumbotron">
                <div class="container">
                    <h1 class="display-4">Request Data Validation</h1>
                </div>
            </header>
            <!-- E: Header -->

            <div class="container">

                <form action="" @submit.prevent="requestValidation()">
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="form-group">
                                <div class="d-flex align-items-center mb-3">
                                    <label class="mr-3 mb-0">Job Category</label>
                                    <select class="form-control-sm" v-model="job_category">
                                        <option value="1">Computing and ICT</option>
                                        <option value="2">Construction and building</option>
                                        <option value="3">Animals, land and environment</option>
                                        <option value="4">Design, arts and crafts</option>
                                        <option value="5">Education and training</option>
                                    </select>
                                </div>
                                <textarea v-model="job_position" class="form-control" cols="30" rows="5"
                                    placeholder="Job position sparate with , (comma)"></textarea>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <div class="d-flex align-items-center mb-3">
                                    <label class="mr-3 mb-0">Work Experiences ?</label>
                                    <select class="form-control-sm" v-model="work_experience">
                                        <option value="yes">Yes, I have</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <textarea v-model="desc_work_experience"  class="form-control" v-if="work_experience == 'yes'" cols="30" rows="5"
                                    placeholder="Describe your work experiences"></textarea>
                                 <textarea  class="form-control" v-if="work_experience == null" cols="30" rows="5"
                                    placeholder="Describe your work experiences"></textarea>
                                    <textarea v-model="desc_work_experience"  class="form-control" v-if="work_experience == 'no'" disabled cols="30" rows="5"
                                    placeholder="Describe your work experiences"></textarea>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="d-flex align-items-center mb-3">
                                    <label class="mr-3 mb-0">Reason Accepted</label>
                                </div>
                                <textarea v-model="reason_accepted" class="form-control" cols="30" rows="6"
                                    placeholder="Explain why you should be accepted"></textarea>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary">Send Request</button>
                </form>

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
        name: "RequestValidationView",
        components: {
            NavbarComponent,
            FooterComponent
        },
        data(){
            return {
                job_category: null,
                work_experience: null,
                desc_work_experience: null,
                reason_accepted: null,
                job_position: null,
            }
        },
        methods: {
            requestValidation(){
                this.token = localStorage.getItem('token')
                axios.post(`http://127.0.0.1:8000/api/v1/validations?token=${this.token}`, {
                    work_experience: this.desc_work_experience,
                    job_category_id: this.job_category,
                    job_position: this.job_position,
                    reason_accepted: this.reason_accepted
                }).then(
                    response => {
                        console.log(response)
                        alert(response.data.message)
                        this.$router.push('/')
                    }
                ).catch(
                    error => {
                        console.log(error)
                        alert(error.response.data.message)
                    }
                )
            }
        },
        mounted(){
            const token = localStorage.getItem('token')

            if (token == null) {
                this.$router.push('/login')
            }
        }
    }
</script>