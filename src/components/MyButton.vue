<template>
  <div class="wrapper">
    <span>Текст</span>
    <br />
    <button v-bind="$attrs">Натисни на мене!</button>
  </div>
</template>

<script setup>
import { defineOptions } from "vue";

defineOptions({
  inheritAttrs: false,
});
</script>

<style>
.wrapper {
  width: 800px;
  border: 1px solid blue;
  padding: 10px;
  margin: auto;
}
</style>
