<template>
<div>
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
