<template>

  <div >
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
  methods: {async fetchSingleRide(event, id){
    console.log(event)
      return axios.get('http://localhost:3000/showRide/'+id)
        .catch(function (error) {console.log(error);})

      }
    }

}

</script>
<style>


</style>
