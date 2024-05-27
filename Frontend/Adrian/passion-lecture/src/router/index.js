import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Details from '@/components/Details.vue'
import BookItem from '@/components/BookItem.vue'
import EditBookInfo from '@/components/EditBookInfo.vue'

import Profile from '../views/UserView.vue'
import ProfileAdmin from '../views/UserViewAdmin.vue'
import NewBook from '../views/UserNewBook.vue'
import UsersList from '../views/UsersListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/books',
      name: 'books',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Livres.vue')
    },

    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/details/:id',
      name: 'details',
      component: Details
    },
    
    {
      path: '/books/:id',
      name: 'bookItem',
      component: BookItem
    },
    {
      path:'/profile',
      name:'Profile',
      component: Profile
    },
    {
      path:'/profileAdmin',
      name:'ProfileAdmin',
      component: ProfileAdmin
    },
    {
      path:'/newBook',
      name:'NewBook',
      component: NewBook
    },
    {
      path:'/usersList',
      name:'UsersList',
      component: UsersList
    },
    {
      path:'/editBook/:bookId',
      name:'EditBookInfo',
      component: EditBookInfo
    }
  ]
})

export default router
