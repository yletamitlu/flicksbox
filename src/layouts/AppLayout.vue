<template>
  <div class="min-h-screen bg-theme-bg text-theme-text">
    <header class="bg-theme-card shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between py-6">
          <div class="flex gap-s">
            <span class="text-2xl">🎞</span>
            <Logo class="mx-auto w-40 text-theme-text" @click="goHome"/>
          </div>

          <div class="flex items-center space-x-4">
            <ThemeSelector/>

            <div class="flex items-center space-x-2">
              <Button
                v-if="isAuthenticated"
                :variant="VARIANTS.primary"
                :loading="isFavoritesFetching"
                @click="$router.push({ name: Routes.Favorites })"
              >
                Избранное ({{ favoritesCount }})
              </Button>

              <Button
                v-if="!isHomePage"
                :variant="VARIANTS.ghost"
                @click="goHome"
              >
                На главную
              </Button>
            </div>

            <div
              v-if="isAuthenticated"
              class="flex items-center space-x-2"
            >
              <span class="text-sm text-theme-text"> Привет, {{ username }}! </span>
              <Button
                :loading="isFetching"
                :variant="VARIANTS.outline"
                @click="handleLogout"
                :disabled="isFetching"
              >
                Выйти
              </Button>
            </div>

            <Button
              v-else
              :variant="VARIANTS.primary"
              @click="showLoginModal = true"
            >
              Войти
            </Button>
          </div>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <slot/>
    </main>

    <LoginModal
      :is-open="showLoginModal"
      @close="showLoginModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Routes } from '@/constants/routes.ts'
import { SIZES, VARIANTS, COLORS } from '@/constants/ui.ts'
import Heading from '@/components/ui/Heading.vue'
import Button from '@/components/ui/Button.vue'
import ThemeSelector from '@/components/ThemeSelector.vue'
import LoginModal from '@/components/LoginModal.vue'
import { useFavoritesStore } from '@/stores/useFavoritesStore.ts'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { storeToRefs } from 'pinia'
import Logo from '@/components/icons/Logo.vue'

const route = useRoute()
const router = useRouter()

const favoritesStore = useFavoritesStore()
const { isFetching: isFavoritesFetching, favoritesCount } = storeToRefs(favoritesStore)
const { loadFavorites } = favoritesStore

const authStore = useAuthStore()
const { logout } = authStore
const { isAuthenticated, username, isFetching } = storeToRefs(authStore)

const showLoginModal = ref(false)

const isHomePage = computed(() => route.name === Routes.Home)

watch(
  isAuthenticated,
  (isAuthenticated) => {
    if (isAuthenticated) {
      loadFavorites()
    }
  },
  { immediate: true },
)

const goHome = () => {
  router.push({ name: Routes.Home })
}

const handleLogout = async () => {
  await logout()
}
</script>
