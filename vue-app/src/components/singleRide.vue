<template>

  <div class="single-view">
    <button  @click="singleRideViewClose()">Close</button>
    <h1>Single Ride View</h1>
  </div>

</template>



<script>
import axios from 'axios';
export default{
  name: "singleRideView",
  data(){
    return{

    }
  },
  events:{
    showSingleRide: function(id, isHidden){
        console.log(id)
        console.log(isHidden)
    },
  },
  methods: {
    singleRideViewClose(){
      this.$emit('closeSingleView');
    },
    async fetchSingleRide(event, id){
    console.log(event)
      return axios.get('http://localhost:3000/showRide/'+id)
        .catch(function (error) {console.log(error);})

      }
    }

}

</script>
<style>
.single-view{
  border-color: black;
  border-width: thin;
  border-style: solid;
  background: white;
  padding:2.5%;
  position: absolute;

  right: 40%;
  top: 40%;

}

</style>
