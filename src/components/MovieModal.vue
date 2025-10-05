<template>
  <TransitionRoot
    appear
    :show="opened"
    as="template"
  >
    <Dialog
      as="div"
      class="relative z-10"
      @close="$emit('close')"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25"/>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-theme-card p-6 text-left align-middle shadow-xl transition-all">
              <div class="mb-4 flex items-center justify-between">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-theme-text"
                >
                  {{ movie?.title || "" }}
                </DialogTitle>
              </div>

              <div
                v-if="movie"
                class="space-y-4"
              >
                <img
                  v-if="movie.poster_path"
                  :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                  :alt="movie.title"
                  class="h-64 w-full rounded-lg object-cover"
                />
                <p class="text-theme-text">{{ movie.overview }}</p>
                <div class="flex items-center space-x-4 text-sm text-theme-muted">
                  <span>Рейтинг: {{ movie.vote_average?.toFixed(1) }}/10</span>
                  <span>•</span>
                  <span>{{ new Date(movie.release_date).getFullYear() }}</span>
                </div>
              </div>

              <div class="mt-6 flex justify-end space-x-3">
                <Button
                  @click="goToDetails"
                  :variant="VARIANTS.primary"
                  :size="SIZES.s"
                  :full-width="true"
                >
                  Подробнее
                </Button>
                <Button
                  :variant="VARIANTS.primary"
                  @click="$emit('close')"
                >
                  Закрыть
                </Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { SIZES, VARIANTS } from '@/constants/ui.ts'
import Button from '@/components/ui/Button.vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Movie } from '@/types/movie.ts'
import { Routes } from '@/constants/routes.ts'
import { useRouter } from 'vue-router'

interface Props {
  movie: Movie
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const opened = defineModel<boolean>({ required: true })

const router = useRouter()
const goToDetails = () => {
  router.push({ name: Routes.MovieDetail, params: { id: props.movie.id.toString() } })
}
</script>
