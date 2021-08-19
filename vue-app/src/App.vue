<template>
  <div id="app">
    <navbar :seen='seen' msg="Navbar....eventually"/>
    <!-- <rideList msg="this is where the calendar goes"/> -->
    <router-view @loggedIn="loggedIn"/>
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
  props:['seen'],
  methods:{
    loggedIn(){
      this.seen = false;
    }
  }

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
