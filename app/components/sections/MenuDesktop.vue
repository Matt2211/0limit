<template>
  <header class="fixed top-2 left-1/2 z-50 w-full -translate-x-1/2">
    <div class="m-auto flex items-center px-4 lg:px-12">
      <!-- Logo -->
      <NuxtLink to="/" class="logo">
        <img src="/logo.png" class="h-13" alt="STUDIO3266 logo" />
      </NuxtLink>

      <!-- Main navigation -->
      <nav class="flex-1" aria-label="Main navigation">
        <ul
          class="font-jet-brains-mono m-auto flex items-center justify-end md:space-x-12 lg:space-x-20">
          <li>
            <button
              @click="toggleTheme"
              aria-label="Toggle theme"
              class="border-primary relative h-4 w-10 cursor-pointer border transition-colors duration-300">
              <span
                class="bg-inverted absolute top-0.5 left-0.5 h-2.5 w-4 transition-transform duration-300"
                :class="isDark ? 'translate-x-4.5' : 'translate-x-0'" />
            </button>
          </li>
          <li v-for="item in menuItems" :key="item.label">
            <NuxtLink
              :to="item.to"
              class="text-primary relative pb-1 text-sm font-medium tracking-widest transition-opacity hover:opacity-70"
              active-class="after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-current">
              {{ item.label }}
            </NuxtLink>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.instagram.com/studio.3266/"
              class="text-primary relative pb-1 text-sm font-medium tracking-widest transition-opacity hover:opacity-70"
              active-class="after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-current">
              INSTAGRAM
            </a>
          </li>

          <li class="flex items-center gap-x-4">
            <Button
              href="https://www.fresha.com/a/studio-3266-manchester-ducie-house-37-ducie-street-uugc92k7/all-offer?menu=true&pId=2559796&utm_content=link_in_bio&utm_medium=social&utm_source=ig"
              target="_blank"
              >BOOK NOW</Button
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isDark = ref(false)
const THEME_KEY = 'theme'

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
}

function initTheme() {
  if (!process.client) return

  const saved = localStorage.getItem(THEME_KEY)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  isDark.value = saved ? saved === 'dark' : prefersDark
  applyTheme(isDark.value)
}

function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
  localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light')
}

onMounted(initTheme)

type MenuItem = {
  label: string
  to: string
}

const menuItems: MenuItem[] = [
  { label: 'SERVICES', to: '/services' },
  { label: 'TEAM', to: '/team' },
]
</script>
