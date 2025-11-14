<template>
  <div class="todo-container">
    <h2>Список завдань</h2>

    <!-- Форма додавання -->
    <form @submit.prevent="addTodo" class="todo-form">
      <input
        v-model="newTodo"
        placeholder="Додайте нове завдання..."
        class="todo-input"
        required
      />
      <button type="submit" class="add-btn">Додати</button>
    </form>

    <!-- Статистика -->
    <div class="todo-stats">
      <p>
        Усього: {{ totalTodos }} | Завершені: {{ completedCount }} |
        Незавершені: {{ remainingCount }}
      </p>
    </div>

    <!-- Кнопки фільтрації
        @click="filter = 'all'" - при кліку змінює реактивну змінну filter
        :class="{ active: filter === 'all' }" - додає клас active, якщо умова виконується -->
    <div class="filter-buttons">
      <button
        @click="filter = 'all'"
        class="filter-btn"
        :class="{ active: filter === 'all' }"
      >
        Усі
      </button>
      <button
        @click="filter = 'active'"
        class="filter-btn"
        :class="{ active: filter === 'active' }"
      >
        Активні
      </button>
      <button
        @click="filter = 'completed'"
        class="filter-btn"
        :class="{ active: filter === 'completed' }"
      >
        Завершені
      </button>
    </div>

    <!-- Список завдань -->
    <ul class="todo-list" v-if="filteredTodos.length > 0">
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="todo-item"
        :class="{ completed: todo.completed }"
      >
        <input type="checkbox" v-model="todo.completed" class="todo-checkbox" />
        <span class="todo-text">{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)" class="delete-btn">
          Видалити
        </button>
      </li>
    </ul>

    <!-- Стан завдань -->
    <div v-else class="state">
      <p v-if="filter === 'all'">Ще немає завдань. Додай перше!</p>
      <p v-else-if="filter === 'active'">Немає активних завдань!</p>
      <p v-else>Немає завершених завдань!</p>
    </div>

    <!-- Очищення виконаних -->
    <button v-if="completedCount > 0" @click="clearCompleted" class="clear-btn">
      Очистити завершені ({{ completedCount }})
    </button>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";

// Реактивні данні
const newTodo = ref("");
const todos = ref([]);
const filter = ref("all");
let nextId = 0;

// Автоматичне збереження при зміні todos
watch(
  todos,
  () => {
    updateLocalStorage();
  },
  { deep: true }
);

// Методи
// Додавання завдання
const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: nextId++,
      text: newTodo.value.trim(),
      completed: false,
    });
    newTodo.value = "";
  }
};

// Видалення завдання
const removeTodo = (id) => {
  // Створюємо новий масив без завдання з вказаним id
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

// Очищення виконаних
const clearCompleted = () => {
  // Залишаємо тільки невиконані завдання
  todos.value = todos.value.filter((todo) => !todo.completed);
};

// Завантаження данних з localStorage
const loadDataFromLocalStorage = () => {
  const stored = localStorage.getItem("todoList");
  todos.value = stored ? JSON.parse(stored) : [];
};

// Оновлення масиву в localStorage
const updateLocalStorage = () => {
  localStorage.setItem("todoList", JSON.stringify(todos.value));
};

// Обчислювальні властивості
// Загальна кількість
const totalTodos = computed(() => todos.value.length);

// Кількість виконаних
const completedCount = computed(
  () => todos.value.filter((todo) => todo.completed).length
);

// Кількість активних
const remainingCount = computed(
  () => todos.value.filter((todo) => !todo.completed).length
);

// Відфільтровані завдання
const filteredTodos = computed(() => {
  switch (filter.value) {
    case "active":
      return todos.value.filter((todo) => !todo.completed); // тільки активні
    case "completed":
      return todos.value.filter((todo) => todo.completed); // тільки виконані
    default:
      return todos.value; // Всі завдання
  }
});

onMounted(loadDataFromLocalStorage);
</script>

<style scoped>
.todo-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-input {
  flex: 1;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.todo-input:focus {
  outline: none;
  border-color: #42b983;
}

.add-btn {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #369870;
}

.todo-stats {
  text-align: center;
  margin-bottom: 15px;
  color: #666;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover {
  border-color: #42b983;
}

.filter-btn.active {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 8px;
  transition: all 0.3s;
}

.todo-item:hover {
  background-color: #f9f9f9;
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.todo-text {
  flex: 1;
  text-align: left;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  padding: 6px 12px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #c0392b;
}

.state {
  text-align: center;
  color: #888;
  font-style: italic;
  padding: 40px 20px;
}

.clear-btn {
  width: 100%;
  padding: 10px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.clear-btn:hover {
  background-color: #e67e22;
}

/* Dark theme support */
.dark .todo-input {
  background-color: #2d3748;
  border-color: #4a5568;
  color: white;
}

.dark .todo-item {
  background-color: #2d3748;
  border-color: #4a5568;
}

.dark .todo-item:hover {
  background-color: #4a5568;
}

.dark .filter-btn {
  background-color: #2d3748;
  border-color: #4a5568;
  color: white;
}
</style>
