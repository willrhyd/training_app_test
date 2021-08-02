<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <FileUpload />
    <navbar msg="Navbar....eventually"/>
    <!-- <rideList msg="this is where the calendar goes"/> -->
    <calendar/>

  </div>
</template>

<script>
import navbar from './components/navbar.vue'
// import rideList from './components/rideList.vue'
import FileUpload from './components/upload.vue'
import calendar from './components/calendar.vue'


export default {
  name: 'App',
  components: {
    navbar,

    FileUpload,
    calendar
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
