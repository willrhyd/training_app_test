<template>
  <div>
    <form @submit.prevent='handleSubmit'>
      <div class= 'form-group'>
        <label>Username</label>
        <input type='text' class='form-control' v-model='username' placeholder='Username' />
      </div>
      <div class= 'form-group'>
        <label>Password</label>
        <input type='password' class='form-control' v-model='password' placeholder='Password' />
      </div>
      <button>Log in</button>
    </form>
    <p>
      Not registered?<a href='/register'> Sign Up</a>
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  name: 'login',
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    async handleSubmit(){
      try{
      const response = await axios.post('/login',{
        username: this.username,
        password: this.password
      });
      console.log(response);
      this.$router.push('/');
      this.$emit('loggedIn')
    } catch (err){
        console.log(err)
        this.$router.push('/login');
      }



    }
  }
}


</script>
