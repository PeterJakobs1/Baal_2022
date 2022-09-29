import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import DetailPage from '../views/DetailPage.vue'
import AuthenticationPage from '../views/AuthenticationPage.vue'
import NewCampSpot from '../views/NewCampSpot.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
    
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailPage
  },
  {
    path: "/authentication",
    name: "Login",
    component: AuthenticationPage,
  },
  
  {
    path: '/newCampSpot',
    name: 'NewCampSpot',
    component: NewCampSpot
  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
