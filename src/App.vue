<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLocalStorage } from './compositions/useLocalStorage';
const {watcher, hydrate} = useLocalStorage()
hydrate()
watcher()
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

