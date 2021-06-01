<!--
 * @author: Spring
 * @create: 2021-05-31 14:44 PM
 * @license: MIT
 * @lastAuthor: Spring
 * @lastEditTime: 2021-05-31 18:28 PM
 * @desc:
-->
<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Commodity</router-link> -->
      <!-- <router-link to="/car">Car</router-link> -->
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
