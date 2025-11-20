<template>
  <teleport to="body">
    <div v-if="modelValue" class="teleport-overlay" @click.self="handleClose">
      <div class="teleport-modal">
        <header class="teleport-header" v-if="$slots.title">
          <slot name="title"></slot>
          <button class="teleport-close" @click="handleClose">x</button>
        </header>

        <div class="teleport-body">
          <slot>
            <p>Default контент модального вікна</p>
          </slot>
        </div>

        <footer class="teleport-footer">
          <slot name="actions">
            <button class="teleport-btn" @click="handleClose">Закрити</button>
          </slot>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleClose = () => {
  emit("update:modelValue", false);
};
</script>

<style>
.teleport-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.teleport-modal {
  background: white;
  border-radius: 8px;
  padding: 0;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.teleport-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
  margin-bottom: 1rem;
}

.teleport-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.teleport-close:hover {
  color: #000;
  background: #f0f0f0;
  border-radius: 50%;
}

.teleport-body {
  padding: 0 1.5rem;
}

.teleport-body ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.teleport-body li {
  margin-bottom: 0.5rem;
}

.teleport-footer {
  padding: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  border-top: 1px solid #eee;
  margin-top: 1.5rem;
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
