import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import DetailPage from '../views/DetailPage.vue'
import AuthenticationPage from '../views/AuthenticationPage.vue'
import NewCampSpot from '../views/NewCampSpotPage.vue'
import { toastController } from '@ionic/vue';
import { authService } from '@/services/directus.service';


const authenticationRequierdRouteGuard = async () => {
  const userAccessToken = localStorage.getItem('auth_token')

  if(!userAccessToken){
    return {name: "Login"}
    // alt som kommer etter return blir ikke kjørt 
    // hvis ikke man er logget inn
  }
  // hvis brker er logget inn: 
  const userAccessTokenExpiresAt = localStorage.getItem("auth_expires_at") as unknown as number;

  if (userAccessTokenExpiresAt < new Date().getTime()){

    const errorToast = await toastController.create({
    message:"Brukersesjon er utløpt - prøv å logge inn på nytt",
    duration: 3000,
    color: "warinng"
    });

    // await brukes til å vente på et løfte og få oppfyllelsesverdien
    await errorToast.present()

    
    await authService.logout()
    
    return {name: "Login"}
  }
    
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    beforeEnter:[authenticationRequierdRouteGuard]
    // når bruker trykker på en ny route kalles
    // beforeEnter funksjonen som sender bruker til innloggingsiden 
    // *(om bruker ikke er logget inn ofc!!)
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailPage,
    beforeEnter:[authenticationRequierdRouteGuard]
  },
  {
    path: "/authentication",
    name: "Login",
    component: AuthenticationPage,
  },
  
  {
    path: '/new-spot',
    name: 'NewCampSpot',
    component: NewCampSpot,
    beforeEnter:[authenticationRequierdRouteGuard]

  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
