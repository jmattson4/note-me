<script setup lang="ts">

import CreateNote from '../components/create-note.vue';
import Search from '../components/search.vue';
import NoteConteiner from '../components/note-conteiner.vue';
</script>

<template>
  <main class="container">
    <div class="down">
      <div class="level" style="width: 100%;">
        <CreateNote />
        <Search />
      </div>
      <div>
        <NoteConteiner/>
      </div>
    </div>
  </main>
</template>


<style>
.down {
  margin-top: 15vh;
}
</style>
