<script setup lang="ts">

import CreateNote from '../components/create-note.vue';
import Search from '../components/search.vue';
import NoteConteiner from '../components/note-conteiner.vue';
</script>

<template>
  <main>
    <div class="down">
      <div class="level" >
        <CreateNote />
        <Search />
      </div>
      <NoteConteiner/>
    </div>
  </main>
</template>


<style>
.down {
  margin-top: 15vh;
}
</style>
