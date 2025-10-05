<template>
  <svg
    :class="['h-5 w-5', filled ? 'text-red-500' : 'text-gray-400']"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      v-if="filled"
      fill-rule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clip-rule="evenodd"
    />
    <path
      v-else
      fill-rule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clip-rule="evenodd"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  filled: boolean
}

defineProps<Props>()
</script>
