import Vue from 'vue';
import Router from 'vue-router';
import calendar from './components/calendar'
import login from './components/login'
import register from './components/register'


Vue.use(Router)

export default new Router ({
  mode: 'history',
  routes:[
    {path:'/', component: login},
    {path:'/calendar', component: calendar},
    {path:'/register', component: register}
  ]
})
