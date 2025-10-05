import { createRouter, createWebHistory } from 'vue-router'
import { Routes } from '@/constants/routes.ts'
import HomePage from '@/pages/HomePage.vue'
import MovieDetailPage from '@/pages/MovieDetailPage.vue'
import FavoritesPage from '@/pages/FavoritesPage.vue'
import ErrorPage from '@/pages/ErrorPage.vue'

const routes = [
  {
    path: '/',
    name: Routes.Home,
    component: HomePage,
  },
  {
    path: '/movie/:id',
    name: Routes.MovieDetail,
    component: MovieDetailPage,
    props: true,
  },
  {
    path: '/favorites',
    name: Routes.Favorites,
    component: FavoritesPage,
  },
  {
    path: '/error',
    name: Routes.Error,
    component: ErrorPage,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: Routes.NotFound,
    component: ErrorPage,
    props: { message: 'Страница не найдена' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
