<script setup lang="ts">

import CreateNote from '../components/action-button.vue';
import Search from '../components/search.vue';
import NoteContainer from '../components/note-container.vue';
</script>

<template>
  <main>
    <div class="down">
      <div style="display: flex; justify-content: center; column-gap: 1vw;">
        <CreateNote />
        <Search />
      </div>
      <NoteContainer/>
    </div>
  </main>
</template>


<style>
.down {
  margin-top: 15vh;
}
</style>
