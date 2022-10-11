import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import Error404View from '../views/Error404View.vue'
import RequestValidationView from '../views/RequestValidationView.vue'
import JobVacanciesView from '../views/JobVacanciesView.vue'
import ApplyJobView from '../views/ApplyJobView.vue'

const routes = [
  {
    path: '/*',
    name: '404',
    component: Error404View
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/request-validation',
    name: 'requestValidation',
    component: RequestValidationView
  },
  {
    path: '/job-vacancies',
    name: 'jobVacancies',
    component: JobVacanciesView
  },
  {
    path: '/apply-job',
    name: 'applyJob',
    component: ApplyJobView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
