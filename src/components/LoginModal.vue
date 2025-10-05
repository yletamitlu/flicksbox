<template>
  <TransitionRoot
    appear
    :show="isOpen"
    as="template"
  >
    <Dialog
      as="div"
      class="relative z-10"
      @close="close"
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
                  Вход в аккаунт
                </DialogTitle>
                <button
                  @click="close"
                  class="text-theme-muted transition-colors hover:text-theme-text"
                >
                  <XMarkIcon class="h-6 w-6"/>
                </button>
              </div>

              <form
                @submit.prevent="handleLogin"
                class="space-y-4"
              >
                <div>
                  <label
                    for="username"
                    class="mb-1 block text-sm font-medium text-theme-text"
                  >
                    Имя пользователя
                  </label>
                  <Input
                    id="username"
                    v-model="form.username"
                    type="text"
                    placeholder="Введите имя пользователя"
                    :error="errors.username"
                    required
                  />
                </div>

                <div>
                  <label
                    for="password"
                    class="mb-1 block text-sm font-medium text-theme-text"
                  >
                    Пароль
                  </label>
                  <Input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="Введите пароль"
                    :error="errors.password"
                    required
                  />
                </div>

                <div
                  v-if="error"
                  class="rounded-lg border border-red-200 bg-red-50 p-3"
                >
                  <p class="text-sm text-red-600">{{ error }}</p>
                </div>

                <div class="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    :variant="VARIANTS.outline"
                    @click="close"
                    class="flex-1"
                    :disabled="isFetching"
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    :variant="VARIANTS.primary"
                    class="flex-1"
                    :loading="isFetching"
                    :disabled="!form.username || !form.password"
                  >
                    {{ isFetching ? "Вход..." : "Войти" }}
                  </Button>
                </div>
              </form>

              <div class="mt-6 text-center">
                <p class="text-sm text-theme-muted">
                  Нет аккаунта?
                  <a
                    href="https://www.themoviedb.org/signup"
                    target="_blank"
                    class="font-medium text-theme-accent hover:text-theme-highlight"
                  >
                    Зарегистрироваться на TMDB
                  </a>
                </p>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { VARIANTS } from '@/constants/ui.ts'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import { storeToRefs } from 'pinia'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const authStore = useAuthStore()
const { login, clearError } = authStore
const { error, isFetching } = storeToRefs(authStore)

const form = reactive({
  username: '',
  password: '',
})

const errors = reactive({
  username: '',
  password: '',
})

const validateForm = () => {
  errors.username = ''
  errors.password = ''

  if (!form.username.trim()) {
    errors.username = 'Имя пользователя обязательно'
    return false
  }

  if (!form.password.trim()) {
    errors.password = 'Пароль обязателен'
    return false
  }

  return true
}

const handleLogin = async () => {
  if (!validateForm()) return

  clearError()

  const result = await login(form.username, form.password)

  if (result.success) {
    close()

    form.username = ''
    form.password = ''
  }
}

const close = () => {
  emit('close')
  clearError()

  form.username = ''
  form.password = ''
  errors.username = ''
  errors.password = ''
}
</script>
