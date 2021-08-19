<template>
  <div class="nav">

    <ul v-on:loggedIn="seen!=seen">
      <li><a href="/" target="_blank" rel="noopener">Home</a></li>
      <li v-show="seen"><a href="/login" target="_blank" rel="noopener">Login</a></li>
      <li v-show="seen"><a href="/register" target="_blank" rel="noopener">Sign Up</a></li>
      <li v-show="!seen"><a v-on:click="handleLogout" href="/login" target="_blank" rel="noopener">Logout</a></li>
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
        .then(this.seen=false);
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
