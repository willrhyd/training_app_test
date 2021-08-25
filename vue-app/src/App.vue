<template>
  <div id="app">
    <navbar/>
    <!-- <rideList msg="this is where the calendar goes"/> -->
    <router-view />
  </div>
</template>

<script>
import navbar from './components/navbar.vue'

// import rideList from './components/rideList.vue'


export default {
  name: 'App',
  components: {
    navbar,
    },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
