<template>
  <h1>Teleport</h1>
  <div class="teleport-card">
    <p>
      Відкриваємо модальне вікно та інспектуємо DOM - контент перемістився в
      body
    </p>
    <button class="teleport-btn" @click="openModal">
      Відкрити модальне вікно
    </button>
  </div>

  <ModalTeleport v-model="isModalOpen">
    <template #title>
      <h3>Чому Teleport?</h3>
    </template>

    <ul>
      <li>Незалежність від батьків</li>
      <li>Все на своєму місці</li>
      <li>Простота в управлінні</li>
    </ul>

    <template #actions>
      <button class="teleport-btn" @click="handleClose">Зрозуміло</button>
    </template>
  </ModalTeleport>
</template>

<script setup>
import { ref } from "vue";
import ModalTeleport from "@/components/ModalTeleport.vue";

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const handleClose = () => {
  isModalOpen.value = false;
};
</script>

<style>
.teleport-card {
  max-width: 800px;
  background: #f5f5f5;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
}

.teleport-btn {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.teleport-btn:hover {
  background-color: #369870;
}
</style>
