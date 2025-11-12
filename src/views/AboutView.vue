<template>
  <div class="about">
    <h1>This is an about page</h1>

    <SlotCard>
      <!-- Default slot: основний контент -->
      <p>Мене звати Олексій Петренко. Я розробник на Vue.js</p>
      <ul>
        <li>Вивчаю слоти для гнучких компонентів</li>
        <li>Люблю практичні заняття по Vue.js</li>
        <li>Працюю над власним проектом</li>
      </ul>

      <!-- Іменований слот: header -->
      <template #header>
        <h2>Мій профіль👋</h2>
      </template>

      <!-- Іменований слот: footer -->
      <template #footer>
        <button class="slot-card-btn">Написати</button>
      </template>
    </SlotCard>

    <!-- Використовуємо scoped slot -->
    <UserList>
      <template #user="{ userResponse }">
        <div class="users-list-card">
          <strong>#{{ userResponse.id }}</strong>
          {{ userResponse.name }}
          <span class="role" v-if="userResponse.role === 'Адмін'"
            >💻{{ userResponse.role }}</span
          >
          <span class="role" v-else>{{ userResponse.role }}</span>
          <span>{{ userResponse.city }}</span>
          <button @click="sayHello(userResponse)">Привіт!</button>
        </div>
      </template>
    </UserList>
  </div>
</template>

<script setup>
import SlotCard from "@/components/SlotCard.vue";
import UserList from "@/components/UserList.vue";

const sayHello = (user) => {
  alert(`Привіт, ${user.name}! Ви з ${user.city}.`);
};
</script>

<style>
ul {
  text-align: left;
}

.slot-card-btn {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.slot-card-btn:hover {
  background-color: #369870;
}

.users-list-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #e3f2fd;
  border-radius: 6px;
  margin: 5px 0;
  font-size: 1em;
}

.role {
  color: #1976d2;
  font-weight: bold;
  margin: 0 8px;
}
</style>
