import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import AuthHandler from '../views/auth/AuthHandler'
import Signin from '../views/auth/Signin'
import Product from '../views/product/Product'


Vue.use(VueRouter)

  const routes = [
    { path: '/', name: 'About', component: About },
    //authentication
    { path: '/oauth2/callback', name: 'auth handler', component: AuthHandler},
    { path: '/signin', name: 'signin', component: Signin},

    //product
    { path: '/product', name: 'Product', component: Product},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
