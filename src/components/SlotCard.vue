<template>
  <div class="card">
    <header class="card-header">
      <slot name="header"></slot>
    </header>

    <div class="content">
      <slot></slot>
    </div>

    <div>
      <slot name="userImage"></slot>
    </div>

    <footer class="card-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style>
.card {
  max-width: 600px;
  margin: 40px auto;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.card-header {
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 16px 16px 0 0;
  border-bottom: 1px solid #ddd;
}

.content {
  padding: 20px;
}

.card-footer {
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 0 0 16px 16px;
  border-top: 1px solid #ddd;
}
</style>
