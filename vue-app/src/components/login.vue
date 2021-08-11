<template>
  <div>
    <form @submit.prevent='handleSubmit'>
      <div class= 'form-group'>
        <label>Email</label>
        <input type='text' class='form-control' v-model='email' placeholder='Email' />
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
      email:'',
      password:''
    }
  },
  methods:{
    async handleSubmit(){
      const response = await axios.post('/login',{
        email: this.email,
        password: this.password
      });

      console.log(response);
      this.$router.push('/');
    }
  }
}


</script>
