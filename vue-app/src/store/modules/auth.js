//store/modules/auth.js
import axios from 'axios'
import Cookies from 'js-cookie'

const state = {
  user: null,
};

const getters = {
  isAuthenticated: function (state) {
    return !!state.user && !!Cookies.get('trainingApp')
  },
  StateUser: state => state.user,
};

const actions = {
  async Register({dispatch}, form) {
    let user = {
      username: form.username,
      password: form.password,
    }
    try{
      var resp = await axios.post('/register', form)
      if(resp.status==200){
        var log_in = await dispatch('LogIn', user)
        if(log_in==200){
          return 200
        }
      } else {throw new Error("Failed to register user")}
    }catch (err){
      console.log(err);
      return 401
    }
},
  async LogIn({commit}, User) {
    try{
      const resp = await axios.post('/login', User);
      console.log(resp.status)
      if(resp.status==200){
          commit('setUser', User.username);
          return 200
        } else {throw new Error("Login failed")}
    } catch (err){
        console.log(err)
        return 401;
      }
  },
  async LogOut({commit}){
    try{
    let user = null
    await axios.get('/logout')
    await commit('LogOut', user)
  } catch (err) {
    console.log(err);
  }
}
};

const mutations = {
  setUser(state, username){
      console.log(username)
       state.user = username

   },
   LogOut(state){
       state.user = null
       Cookies.remove('trainingApp')
   },
};

export default {
  state,
  getters,
  actions,
  mutations
};
