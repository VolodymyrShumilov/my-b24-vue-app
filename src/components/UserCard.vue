<template>
  <div class="user-card" :class="theme">
    <img :src="photo" alt="Фото профілю" class="user-photo" />
    <h2>{{ name }}</h2>
    <p>Вік: {{ age }} років</p>
    <p>Улюблений колір: {{ favoriteColor }}</p>
    <button @click="handleContact" class="contact-btn">Зв'язатися</button>
    <br /><br />
    <button @click="handleColor" class="color-btn">
      Показати улюблений колір
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, inject } from "vue";

// Отримуємо тему через inject
const theme = inject("theme");

// додаємо пропси
const props = defineProps({
  name: {
    type: String,
    default: "Анонім", // запасне ім'я
  },
  photo: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/020/911/736/small_2x/profile-icon-user-icon-person-icon-free-png.png", // запасне фото
  },
  age: {
    type: Number,
    default: 18,
  },
  favoriteColor: {
    type: String,
    default: "синій",
  },
});

// оголошуємо події
const emit = defineEmits(["contact", "color"]);

// функції для обробки кліків
const handleContact = () => {
  emit("contact", props.name, props.age); // випускаємо подію з ім'ям та віком
};
const handleColor = () => {
  emit("color", props.favoriteColor); // випускаємо подію з улюбленим коліром
};
</script>

<style>
.user-card {
  border: 1px solid #ccc;
  padding: 20px;
  width: 300px;
  text-align: center;
  margin: 20px auto;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.user-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid;
  transition: border-color 0.3s ease;
}

.user-card.light .user-photo {
  border-color: #42b983;
}

.user-card.dark .user-photo {
  border-color: #4fd1c7;
}

/* Стилі для світлої теми */
.user-card.light {
  background-color: #f8f9fa;
  color: #2c3e50;
  border-color: #dee2e6;
}

.user-card.light .contact-btn,
.user-card.light .color-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-card.light .contact-btn:hover,
.user-card.light .color-btn:hover {
  background-color: #3aa876;
}

/* Стилі для темної теми */
.user-card.dark {
  background-color: #2d3748;
  color: #e2e8f0;
  border-color: #4a5568;
}

.user-card.dark .contact-btn,
.user-card.dark .color-btn {
  background-color: #4fd1c7;
  color: #1a202c;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.user-card.dark .contact-btn:hover,
.user-card.dark .color-btn:hover {
  background-color: #38b2ac;
}
</style>
