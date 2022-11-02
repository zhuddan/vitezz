<script setup lang="ts"></script>

<template>
  <ul>
    <li>
      <router-link to="/share/detail/a">
        <img width="150" height="150" src="@/assets/images/a.jpg" alt="">
      </router-link>
    </li>
    <li>
      <router-link to="/share/detail/b">
        <img width="150" height="150" src="@/assets/images/b.jpg" alt="">
      </router-link>
    </li>
    <li>
      <router-link to="/share/detail/c">
        <img width="150" height="150" src="@/assets/images/c.jpg" alt="">
      </router-link>
    </li>
  </ul>
</template>

<style scoped lang="scss">
  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li + li {
    margin-top: 10px;
  }

  img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    box-sizing: border-box;
    display: block;
    border-radius: 100%;
  }
</style>
