
    <!-- CalendarMonth.vue -->
<template>
  <ul>


  </ul>
</template>

<script>
import axios from 'axios';
export default {
  mounted(){
    this.fetchRides()
  },

  name: 'rideList',
  data(){
    return {
      rides: null,
      }
  },
  methods: {
    fetchRides(){
      axios.get('https://free-pmc.herokuapp.com/showRides/2021-03-01.2021-07-13')
        .then(response => (this.rides = response.data))
        .catch(function (error) {console.log(error);})
      }
  }
}


</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}

</style>
