<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLocalStorage } from './compositions/useLocalStorage';
import CreateNote from '@/components/action-button.vue';
import Search from '@/components/search.vue';
const { watcher, hydrate } = useLocalStorage()
hydrate()
watcher()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav></nav>
    </div>
  </header>
  <RouterView />
  <footer  style="width:100%">
    <nav class="navbar is-fixed-bottom is-transparent" style="display: flex; justify-content: center; column-gap: 1vw;">
      <CreateNote />
      <Search />
    </nav>
  </footer>
</template>

