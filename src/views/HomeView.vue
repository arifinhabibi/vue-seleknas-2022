<template>
  <div>
    <NavbarComponent />
      <main>
          <!-- S: Header -->
          <header class="jumbotron">
              <div class="container">
                  <h1 class="display-4">Dashboard</h1>
              </div>
          </header>
          <!-- E: Header -->

          <div class="container">

              <!-- S: Data Validation Section -->
              <section class="validation-section mb-5">
                  <div class="section-header mb-3">
                      <h4 class="section-title text-muted">My Data Validation</h4>
                  </div>
                  <div class="row">

                      <!-- S: Link to Request Data Validation -->
                      <div class="col-md-4">
                          <div class="card card-default">
                              <div class="card-header">
                                  <h5 class="mb-0">Data Validation</h5>
                              </div>
                              <div class="card-body">
                                  <router-link to="/request-validation" class="btn btn-primary btn-block">+ Request validation</router-link>
                              </div>
                          </div>
                      </div>
                      <!-- E: Link to Request Data Validation -->

                      <!-- S: Society Data Validation Box (Pending) -->
                      <div class="col-md-4" v-if="validation == true">
                          <div class="card card-default">
                              <div class="card-header border-0">
                                  <h5 class="mb-0">Data Validation</h5>
                              </div>
                              <div class="card-body p-0">
                                  <table class="table table-striped mb-0">
                                      <tr>
                                          <th>Status</th>
                                          <td>
                                            <span class="badge badge-info" v-if="status == 'pending'">{{ status }}</span>
                                            <span class="badge badge-success" v-if="status == 'accepted'">{{ status }}</span>
                                          </td>
                                      </tr>
                                      <tr>
                                          <th>Job Category</th>
                                          <td class="text-muted">{{ job_category }}</td>
                                      </tr>
                                      <tr>
                                          <th>Job Position</th>
                                          <td class="text-muted">{{ job_position }}</td>
                                      </tr>
                                      <tr>
                                          <th>Reason Accepted</th>
                                          <td class="text-muted">{{ reason_accepted == null ? '-' : reason_accepted }}</td>
                                      </tr>
                                      <tr>
                                          <th>Validator</th>
                                          <td class="text-muted">{{ validator == null ? '-' : validator }}</td>
                                      </tr>
                                      <tr>
                                          <th>Validator Notes</th>
                                          <td class="text-muted">{{ validator_notes == null ? '-' : validator_notes }}</td>
                                      </tr>
                                  </table>
                              </div>
                          </div>
                      </div>
                      <!-- E: Society Data Validation Box (Pending) -->

                     

                  </div>
              </section>
              <!-- E: Data Validation Section -->

              <!-- S: List Job Seekers Section -->
              <section class="validation-section mb-5">
                  <div class="section-header mb-3">
                      <div class="row">
                          <div class="col-md-8">
                              <h4 class="section-title text-muted">My Job Applications</h4>
                          </div>
                          <div class="col-md-4" v-if="status == 'accepted'">
                              <router-link to="/job-vacancies" class="btn btn-primary btn-lg btn-block">+ Add Job Applications</router-link>
                          </div>
                      </div>
                  </div>
                  <div class="section-body">
                      <div class="row mb-4">

                          <!-- S: Job Applications info -->
                          <div class="col-md-12" v-if="status != 'accepted'">
                              <div class="alert alert-warning">
                                  Your validation must be approved by validator to applying job.
                              </div>
                          </div>
                          <!-- E: Job Applications info -->

                          <!-- S: Job Applications Box (Registered) -->
                          <div class="col-md-6"  v-for="vacancy in vacancies" v-bind:key="vacancy.id">
                              <div class="card card-default" v-if="vacancies != null">
                                  <div class="card-header border-0">
                                      <h5 class="mb-0">{{ vacancy.company }}</h5>
                                  </div>
                                  <div class="card-body p-0">
                                      <table class="table table-striped mb-0">
                                          <tr>
                                              <th>Address</th>
                                              <td class="text-muted">{{ vacancy.address }}</td>
                                          </tr>
                                          <tr>
                                              <th>Position</th>
                                              <td class="text-muted">
                                                  <ul>
                                                      <li v-for="position in vacancy.position" v-bind:key="position.id">
                                                        {{ position.position }} <span class="badge" :class="{'badge-info': position.apply_status == 'pending', 'badge-danger': position.apply_status == 'rejected', 'badge-success': position.apply_status == 'accepted'}">{{ position.apply_status }}</span>
                                                      </li>
                                                  </ul>
                                              </td>
                                          </tr>
                                          <tr>
                                              <th>Apply Date</th>
                                              <td class="text-muted">September 12, 2022</td>
                                          </tr>
                                          <tr>
                                              <th>Notes</th>
                                              <td class="text-muted">I was the better one</td>
                                          </tr>
                                      </table>
                                  </div>
                              </div>
                          </div>
                          <!-- S: Job Applications Box (Registered) -->

                          
                      </div>

                  </div>
              </section>
              
              <!-- E: List Job Seekers Section -->

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
    name: "HomeView",
    components: { NavbarComponent, FooterComponent },
    data(){
      return {
        validation: false,
        status: null,
        job_category: null,
        job_position: null,
        reason_accepted: null,
        validator: null,
        validator_notes: null,
        vacancies: [],
      }
    },
    methods: {
        getDataValidation(token){
          axios.get(`http://127.0.0.1:8000/api/v1/validations?token=${token}`).then(
            response => {
                // console.log(response)
                this.validation = true
              this.status = response.data.status
              this.job_category = response.data.category.job_category
              this.job_position = response.data.job_position
              this.reason_accepted = response.data.reason_accepted
              this.validator = response.data.validator.name
              this.validator_notes = response.data.validator_notes
            }
            ).catch(
            error => {
              // alert(error.response.data.message)
              console.log(error)
            }
          )
        },
        getDataJobApplies(token){
          axios.get(`http://127.0.0.1:8000/api/v1/applications?token=${token}`).then(
            response => {
              console.log(response)
              this.vacancies = response.data.vacancies
              this.vacancies_data = true
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

      if (token == null) {
        this.$router.push('/login')
      } else {
        this.getDataValidation(token)
        this.getDataJobApplies(token)
      }
    }

}
</script>
