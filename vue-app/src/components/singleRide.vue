<template>

  <div class="single-view">
    <button  @click="singleRideViewClose()">Close</button>
    <h1>{{selectedRide.data.date}}</h1>
    <button @click="deleteRide(selectedRide.data.id)">Delete</button>

  </div>

</template>



<script>

export default{
  name: "singleRideView",
  props:{
    selectedRide: {
      type: Object
    }
  },
  data(){
    return{

    }

  },
  mounted(){
    // console.log(this.selectedRide)
  },
  methods: {
    // Emit event called 'singleRideViewClose' to the Calendar component
    singleRideViewClose(){
      this.$emit('closeSingleView');
    },
    logData(){
      // console.log(this.selectedRide)
    },
    deleteRide(){
      console.log("Send put request")
    }
  },





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
