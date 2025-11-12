<template>
  <div class="todo-view">
    <TodoList />
  </div>
</template>

<script setup>
import TodoList from "@/components/TodoList.vue";
</script>

<style>
.todo-view {
  max-width: 600px;
  margin: 40px auto;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
</style>
