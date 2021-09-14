<template>
<div>
  <form @submit.prevent='submit'>
    <label>Trailing Days</label>
    <input type='text' class='form-control' v-model='trailingDays' placeholder='Number of trailing days' />
    <label>Forecast Days</label>
    <input type='text' class='form-control' v-model='forecastDays' placeholder='Number of forecast days' />
    <button>Update</button>
  </form>
  <canvas id="pmc"></canvas>
</div>
</template>

<script>
import Chart from 'chart.js'
import axios from 'axios'
export default {
  name: 'pmc',
  data(){
    return {
      trailingDays: 90,
      forecastDays: 15,
      pmcData: {
        type: "line",
        data: {
          labels: null,
          datasets: [
            {
              label: "CTL",
              data: null,
              backgroundColor: "rgba(54,73,93,.5)",
              borderColor: "#36495d",
              borderWidth: 3
            },
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25
                }
              }
            ]
          }
        }
      }
    }
  },
  computed:{
    user : function(){return this.$store.getters.StateUser}
  },
  methods:{
    async fetchPmc(){
      var d;
      var labels = [];
      var ctl = [];

      // Work on PMC so you can look at a date range and even forecast
      try{
        var pmc = await axios.get('/pmc/' + this.user)
        pmc.data.forEach(point=>{
          d = new Date(point.date)
          console.log(d.toLocaleDateString('en-GB'))
          labels.push(d.toLocaleDateString('en-GB'));
          ctl.push(point.ctl);
        })
      } catch(err) {
        console.log(err)
      }

      // try{
      //   var pmc = await axios.get('/pmc/' + this.user)
      //   for (var i = this.trailingDays; i >=1; i--){
      //     d = d.setDate(d.getDate()-i)
      //     console.log(d.toLocaleDateString('en-GB'))
      //     labels.push(d.toLocaleDateString('en-GB'));
      //     pmc.data.forEach(point =>{
      //       if (d.getDate)ctl.push(point.ctl);
      //     })
      //
      //   })
      // } catch(err) {
      //   console.log(err)
      // }
      this.pmcData.data.labels = labels;
      this.pmcData.data.datasets[0].data = ctl;
    }
  },
  async created(){
   await this.fetchPmc();
   const ctx = document.getElementById('pmc');
   new Chart(ctx, this.pmcData);
  },

}
</script>

<style>



</style>
