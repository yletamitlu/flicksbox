import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryCache } from '@tanstack/vue-query'
import router from '@/router'
import { Routes } from '@/constants/routes.ts'
import '@/assets/styles/themes.css'
import App from '@/App.vue'
import { CACHE_TIME } from '@/constants/times.ts'

const queryCache = new QueryCache({
  onError: (error: any) => {
    console.error(error)

    const errorMessage = error?.message || 'Произошла ошибка при загрузке данных'
    router.push({
      name: Routes.Error,
      query: { message: errorMessage },
    })
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(VueQueryPlugin, {
  queryClientConfig: {
    queryCache,
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
        staleTime: CACHE_TIME,
        gcTime: CACHE_TIME,
      },
    },
  },
})
app.use(router)
app.mount('#app')
