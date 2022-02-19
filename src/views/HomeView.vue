<script setup lang="ts">
import Button from '@/components/button.vue';
import { ref } from 'vue';
import Modal from '../components/modal.vue';
import CreateNote from '../components/create-note.vue';

const isModalOpen = ref(false)

const onClick = () => {
  isModalOpen.value = !isModalOpen.value
}
</script>

<template>
  <main class="container">
    <div class="down">
      <div class="columns">
        <div class="column">
          <CreateNote/>
        </div>
      </div>
    </div>
  </main>
</template>


<style>
.down {
  margin-top: 15vh;
}
</style>
