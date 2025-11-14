<template>
  <div class="template-refs-demo">
    <!-- Приклад 1 -->
    <div class="example-section">
      <h3>1. Фокус при натисканні на кнопку</h3>
      <input
        type="text"
        placeholder="Я буду сфокусований!"
        class="demo-input"
        ref="myInput"
      />
      <button @click="focusInput" class="demo-btn">Фокус на input</button>
    </div>

    <!-- Приклад 2 -->
    <div class="example-section">
      <h3>2. Читання контенту елемента</h3>
      <p class="context-text" ref="myParagraph">Це якийсь текст в параграфі</p>
      <button @click="readContent" class="demo-btn">Прочитати контент</button>
      <p v-if="content">Контент: "{{ content }}"</p>
    </div>
  </div>

  <!-- Приклад 3 -->
  <div class="example-section">
    <h3>2. Зміна стилю елемента</h3>
    <div ref="myBox" class="style-box">
      Натисні на кнопку, щоб змінити мене!
    </div>
    <button @click="changeStyle" class="demo-btn">Змінити колір</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Приклад 1
const myInput = ref(null);
const focusInput = () => {
  if (myInput.value) {
    myInput.value.focus();
    myInput.value.select();
  }
};

// Приклад 2
const myParagraph = ref(null);
const content = ref("");

const readContent = () => {
  if (myParagraph.value) {
    content.value = myParagraph.value.textContent;
  }
};

// Приклад 3
const myBox = ref(null);
const changeStyle = () => {
  if (myBox.value) {
    const colors = ["red", "blue", "yellow", "green"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    myBox.value.style.backgroundColor = randomColor;
  }
};
</script>

<style>
.template-refs-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.example-section {
  background: #f8f9fa;
  padding: 20px;
  margin-bottom: 25px;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}
.demo-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 6px;
  margin-bottom: 10px;
  font-size: 16px;
}
.demo-btn {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.demo-btn:hover {
  background-color: #369870;
}

.style-box {
  width: 200px;
  height: 100px;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 10px auto;
  transition: background-color 0.3s;
  font-weight: bold;
}
</style>
