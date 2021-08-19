<template>
  <div class="nav">

    <ul v-on:loggedIn="seen!=seen">
      <li v-show="!seen"><a href="/calendar" target="_blank" rel="noopener">Calendar</a></li>
      <li v-show="!seen"><a href="/dashboard" target="_blank" rel="noopener">Dashboard</a></li>
      <li v-show="seen"><a href="/register" target="_blank" rel="noopener">Sign Up</a></li>
      <li v-show="!seen"><a v-on:click="handleLogout" href="/" target="_blank" rel="noopener">Logout</a></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'navbar',
  props:{
    seen:{
      type:Boolean,
      default: true
    }
  },
  methods:{
     async handleLogout(){
      await axios.get('http://localhost:3000/logout')
        .catch((err)=>{console.log(err);})
        .then(()=>{
          this.seen = false;
          this.$router.push('/login')
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
