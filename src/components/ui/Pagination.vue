<template>
  <nav
    class="flex items-center justify-center space-x-1"
    aria-label="Пагинация"
  >
    <Button
      :variant="VARIANTS.secondary"
      :size="SIZES.s"
      :disabled="currentPage === INITIAL_PAGE"
      @click="goToPage(currentPage - 1)"
      class="px-2"
      aria-label="Предыдущая страница"
    >
      <ChevronLeftIcon :size="SIZES.s"/>
    </Button>

    <Button
      v-if="showFirstPage"
      :variant="currentPage === INITIAL_PAGE ? VARIANTS.primary : VARIANTS.secondary"
      :size="SIZES.s"
      @click="goToPage(INITIAL_PAGE)"
      class="px-3"
    >
      1
    </Button>

    <template
      v-for="page in visiblePages"
      :key="page"
    >
      <Button
        :variant="currentPage === page ? VARIANTS.primary : VARIANTS.secondary"
        :size="SIZES.s"
        @click="goToPage(page)"
        class="px-3"
      >
        {{ page }}
      </Button>
    </template>

    <span
      v-if="showEllipsis"
      class="px-2 text-theme-muted"
    >
      ...
    </span>

    <Button
      v-if="showLastPage"
      :variant="currentPage === totalPages ? VARIANTS.primary : VARIANTS.secondary"
      :size="SIZES.s"
      @click="goToPage(totalPages)"
      class="px-3"
    >
      {{ totalPages }}
    </Button>

    <Button
      :variant="VARIANTS.secondary"
      :size="SIZES.s"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
      class="px-2"
      aria-label="Следующая страница"
    >
      <ChevronRightIcon :size="SIZES.s"/>
    </Button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VARIANTS, SIZES } from '@/constants/ui.ts'
import Button from '@/components/ui/Button.vue'
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import { INITIAL_PAGE } from '@/constants/pagination.ts'

interface Props {
  currentPage: number
  totalPages: number
  maxVisiblePages?: number
}

interface Emits {
  (e: 'page-change', page: number): void
}

const props = withDefaults(defineProps<Props>(), {
  maxVisiblePages: 5,
})

const emit = defineEmits<Emits>()

const visiblePages = computed(() => {
  const { currentPage, totalPages, maxVisiblePages } = props

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const half = Math.floor(maxVisiblePages / 2)
  let start = Math.max(1, currentPage - half)
  let end = Math.min(totalPages, start + maxVisiblePages - 1)

  if (end - start + 1 < maxVisiblePages) {
    start = Math.max(1, end - maxVisiblePages + 1)
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const showFirstPage = computed(() => props.totalPages > props.maxVisiblePages && visiblePages.value[0] > 1)

const showLastPage = computed(() => props.totalPages > props.maxVisiblePages && visiblePages.value[visiblePages.value.length - 1] < props.totalPages)

const showEllipsis = computed(() => showLastPage.value && visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1)

const goToPage = (page: number) => {
  if (page >= INITIAL_PAGE && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>
