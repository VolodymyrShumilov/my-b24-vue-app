<template>
  <div class="blog-posts">
    <h2 class="blog-posts__title">Блог</h2>
    <div class="blog-posts__list">
      <!-- Цикл по постах -->
      <div
        v-for="post in postsStore.posts"
        :key="post.id"
        class="blog-posts__card"
      >
        <h3 class="blog-posts__card-title">{{ post.title }}</h3>
        <p class="blog-posts__card-content">{{ post.content }}</p>
        <div class="blog-posts__button-group">
          <button
            class="blog-posts__button blog-posts__button--delete"
            @click="postsStore.removePost(post.id)"
          >
            Видалити
          </button>
          <button
            class="blog-posts__button blog-posts__button--edit"
            @click="startEdit(post)"
          >
            Редагувати
          </button>
        </div>

        <div
          v-if="editingPostId === post.id"
          class="blog-posts__edit-form-wrapper"
        >
          <form @submit.prevent="submitEdit(post.id)">
            <div>
              <label>Заголовок:</label>
              <input
                v-model="editTitle"
                type="text"
                placeholder="Введіть заголовок"
              />
            </div>
            <div>
              <label>Контент:</label>
              <textarea
                v-model="editContent"
                placeholder="Введіть контент"
              ></textarea>
            </div>
            <div class="blog-posts__button-group">
              <button
                type="submit"
                class="blog-posts__button blog-posts__button--save"
              >
                Зберегти
              </button>
              <button
                class="blog-posts__button blog-posts__button--cancel"
                @click="cancelEdit"
              >
                Скасувати
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <p>Загальна кількість постів: {{ postsStore.getPostsCount }}</p>
    <button
      v-if="postsStore.getPostsCount !== 0"
      class="blog-posts__button blog-posts__button--delete"
      @click="postsStore.removeAllPosts()"
    >
      Видалити всі пости
    </button>

    <h3>Додати новий пост</h3>
    <form @submit.prevent="addNewPost">
      <div>
        <label>Заголовок:</label>
        <input
          v-model="newPostTitle"
          type="text"
          placeholder="Введіть заголовок"
        />
      </div>
      <div>
        <label>Контент:</label>
        <textarea
          v-model="newPostContent"
          placeholder="Введіть контент"
        ></textarea>
      </div>
      <button type="submit" class="blog-post__button blog-posts__button--add">
        Додати пост
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { usePostsStore } from "@/stores/store";

const postsStore = usePostsStore();

const newPostTitle = ref("");
const newPostContent = ref("");

const editingPostId = ref(null);
const editTitle = ref("");
const editContent = ref("");

const addNewPost = () => {
  if (newPostTitle.value && newPostContent.value) {
    postsStore.addPost({
      title: newPostTitle.value,
      content: newPostContent.value,
    });
    newPostTitle.value = "";
    newPostContent.value = "";
  }
};

function startEdit(post) {
  editingPostId.value = post.id;
  editTitle.value = post.title;
  editContent.value = post.content;
}

function submitEdit(postId) {
  if (editTitle.value && editContent.value) {
    postsStore.editPost(postId, {
      title: editTitle.value,
      content: editContent.value,
    });
    cancelEdit();
  }
}

function cancelEdit() {
  editingPostId.value = null;
  editTitle.value = "";
  editContent.value = "";
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
form > div {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
input,
textarea {
  width: 100%;
  max-width: 600px;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}
label {
  margin-bottom: 4px;
  font-weight: 500;
  align-self: flex-start;
}
.blog-posts {
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  background: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}
.blog-posts__title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
.blog-posts__loading {
  font-size: 1rem;
  color: #718096;
  text-align: center;
}
.blog-posts__list {
  display: grid;
  gap: 1rem;
}
.blog-posts__card {
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
}
.blog-posts__card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.blog-posts__card-content {
  font-size: 1rem;
  color: #4a5568;
}
.blog-posts__button-group {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}
.blog-posts__button {
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  transition: background 0.2s, color 0.2s;
}
.blog-posts__button--delete {
  background: #e53e3e;
  color: #fff;
}
.blog-posts__button--delete:hover {
  background: #c53030;
}
.blog-posts__button--add {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: #38a169;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
}
.blog-posts__button--add:hover {
  background: #2f855a;
}
.blog-posts__button--edit {
  background: #3182ce;
  color: #fff;
}
.blog-posts__button--edit:hover {
  background: #225ea8;
}
.blog-posts__button--save {
  background: #38a169;
  color: #fff;
}
.blog-posts__button--save:hover {
  background: #2f855a;
}
.blog-posts__button--cancel {
  background: #a0aec0;
  color: #fff;
}
.blog-posts__button--cancel:hover {
  background: #718096;
}
.blog-posts__edit-form-wrapper {
  margin-top: 1rem;
  background: #f7fafc;
  padding: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
}
</style>
