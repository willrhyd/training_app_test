import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
axios.defaults.baseURL = 'http://axios.trainingappserver.uk/';
axios.defaults.withCredentials = true;
