<template>
  <!-- 在这里直接给NavBar加上了，然后就全局都能显示了 -->
  <NavBar />
  <router-view :key="$route.fullPath"/>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import NavBar from './components/NavBar';

export default {
  name: "SApp",
  components: {
    NavBar,
  }
}

</script>

<style>
</style>