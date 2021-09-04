<template>
  <div class="nav">
    <ul>
      <li v-if='isLoggedIn'><a href="/user"  rel="noopener">{{user}}</a></li>
      <li v-if='isLoggedIn'><a href="/calendar" rel="noopener">Calendar</a></li>
      <li v-if='isLoggedIn'><a href="/dashboard"  rel="noopener">Dashboard</a></li>
      <li v-if='isLoggedIn==false'><a href="/register"  rel="noopener">Sign Up</a></li>
      <li v-if='isLoggedIn'><a v-on:click="logout" href="/"  rel="noopener">Logout</a></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'navbar',

  computed : {
     isLoggedIn : function(){return this.$store.getters.isAuthenticated},
     user : function(){return this.$store.getters.StateUser}
   },
  methods:{
     async logout(){
       await this.$store.dispatch('LogOut');
        this.$router.push('/');
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
