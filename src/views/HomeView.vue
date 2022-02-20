<script setup lang="ts">
import CreateNote from '../components/create-note.vue';
import Search from '../components/search.vue';
</script>

<template>
  <main class="container">
    <div class="down">
      <div class="level" style="width: 100%;">
        <CreateNote />
        <Search />
      </div>
    </div>
  </main>
</template>


<style>
.down {
  margin-top: 15vh;
}
</style>
