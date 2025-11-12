<template>
  <div class="user-list">
    <div v-for="user in users" :key="user.id" class="user-item">
      <!-- Scoped slot: передаємо userResponse -->
      <slot name="user" :userResponse="user"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const users = ref([
  { id: 1, name: "Олексій", role: "Адмін", city: "Вінниця" },
  { id: 2, name: "Марія", role: "Користувач", city: "Харків" },
  { id: 3, name: "Софія", role: "Модератор", city: "Київ" },
]);
</script>

<style scoped>
.user-list {
  max-width: 500px;
  margin: 20px auto;
}

.user-item {
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fdfdfd;
}

.fallback {
  color: #888;
  font-style: italic;
  text-align: center;
  padding: 20px;
}
</style>
