//store/modules/auth.js
import axios from 'axios';

const state = {
  user: null,
};

const getters = {
  isAuthenticated: state => !!state.user,
  StateUser: state => state.user,
};

const actions = {
  async Register({dispatch}, form) {
    await axios.post('/register', form)
    let UserForm = new FormData()
    UserForm.append('username', form.username)
    UserForm.append('password', form.password)
    await dispatch('LogIn', UserForm)
},
  async LogIn({commit}, User) {
    try{
      const resp = await axios.post('/login', User);
      if(resp.status==200){
          commit('setUser', User.username);
          return (resp);
        } else {throw new Error("Login failed")}
    } catch (err){
        console.log(err)
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

   },
};

export default {
  state,
  getters,
  actions,
  mutations
};
