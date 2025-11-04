<template>
  <div class="login-view">
    <h2>Вхід до системи</h2>
    <p>Ви намагаєтесь отримати доступ до захищеної сторінки!</p>
    <button @click="login" class="login-btn">Увійти</button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const login = () => {
  auth.login();

  const redirectPath = route.query.redirect || "/blogs";
  router.push(redirectPath);
};
</script>

<style>
.login-view {
}

h2 {
  margin-bottom: 1rem;
  color: var(--text-primary);
}

p {
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
}

.login-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #3aa876;
}
</style>
