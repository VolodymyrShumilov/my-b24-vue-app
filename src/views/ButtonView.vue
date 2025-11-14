<template>
  <div>
    <MyButton id="button-id" class="super-class" @click="handleClick" />
  </div>
</template>

<script setup>
import MyButton from "@/components/MyButton.vue";

function handleClick() {
  alert("Кнопка спрацювала");
}
</script>
