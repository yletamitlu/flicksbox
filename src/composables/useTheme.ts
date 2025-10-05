import { ref, computed } from 'vue'
import { Themes, themeConfig, type ThemeName } from '@/constants/themes.ts'

const THEME_KEY = 'movie-theme'

export const useTheme = () => {
  const currentTheme = ref<ThemeName>(Themes.PulpFiction)

  const loadSavedTheme = () => {
    const saved = localStorage.getItem(THEME_KEY) as ThemeName
    if (saved && Object.values(Themes).includes(saved)) {
      currentTheme.value = saved
    }
  }

  const applyTheme = (themeName: ThemeName) => {
    document.documentElement.classList.remove('reservoir', 'pulp', 'killbill1', 'killbill2', 'jackie', 'deathproof', 'basterds', 'django', 'hateful', 'hollywood')

    document.documentElement.classList.add(themeName)
  }

  const setTheme = (themeName: ThemeName) => {
    currentTheme.value = themeName
    applyTheme(themeName)
    localStorage.setItem(THEME_KEY, themeName)
  }

  const theme = computed(() => themeConfig[currentTheme.value])

  const availableThemes = computed(() =>
    Object.entries(Themes).map(([key, value]) => ({
      key,
      value,
      name: themeConfig[value].name,
    })),
  )

  loadSavedTheme()
  applyTheme(currentTheme.value)

  return {
    currentTheme,
    theme,
    availableThemes,
    setTheme,
  }
}
