<template>
  <div class="blog-post-detail">
    <h1>{{ post?.title || "Пост не знайдено" }}</h1>
    <p>{{ post?.content }}</p>
    <router-link to="/blogs">Назад до постів</router-link>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { usePostsStore } from "@/stores/store";

const route = useRoute();
const postsStore = usePostsStore();
const postId = Number(route.params.id);
const post = postsStore.posts.find((p) => p.id === postId);
</script>

<style scoped>
.blog-post-detail {
  max-width: 48rem;
  margin: 0 auto;
  padding: 1.5rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}
h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
p {
  font-size: 1rem;
  color: #4a5568;
}
a {
  display: inline-block;
  margin-top: 1rem;
  color: #3182ce;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
