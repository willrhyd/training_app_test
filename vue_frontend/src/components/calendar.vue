<template>
  <div>
    <button v-on:click="moveWeekBack">Back 1 Week</button>
    <span>{{this.d1.toDateString()}}</span>
    <button v-on:click="moveWeekForward">Forward 1 Week</button>
    <table style="width:100%">
    <tr>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
      <th>Saturday</th>
      <th>Sunday</th>
    </tr>
    <tr>
      <td>{{d1.getDate()}}</td>
      <td>{{d2.getDate()}}</td>
      <td>{{d3.getDate()}}</td>
      <td>{{d4.getDate()}}</td>
      <td>{{d5.getDate()}}</td>
      <td>{{d6.getDate()}}</td>
      <td>{{d0.getDate()}}</td>
    </tr>
    <tr>
      <td>{{r1.data}}</td>
      <td>{{r2.data}}</td>
      <td>{{r3.data}}</td>
      <td>{{r4.data}}</td>
      <td>{{r5.data}}</td>
      <td>{{r6.data}}</td>
      <td>{{r0.data}}</td>
    </tr>
  </table>
  </div>
</template>

<script>
import axios from 'axios';
export default{
  name: "calendar",
  data(){
    return{
    d1:null,
    d2:null,
    d3:null,
    d4:null,
    d5:null,
    d6:null,
    d0:null,
    r1:null,
    r2:null,
    r3:null,
    r4:null,
    r5:null,
    r6:null,
    r0:null,
    view: null
    }
},
methods: {
  async fetchRides(dateOne, dateTwo){
    return axios.get('https://free-pmc.herokuapp.com/showRides/'+dateOne+'.'+dateTwo)
      .catch(function (error) {console.log(error);})

    },
  setInitialView(){
    this.view = new Date()
  },
  moveWeekBack(){
    this.view.setDate(this.view.getDate()-7);
    this.assignDatesAndRides();
  },
  moveWeekForward(){
    this.view.setDate(this.view.getDate()+7);
    this.assignDatesAndRides();
  },
  async assignDatesAndRides(){

    if (this.view == null){
      this.setInitialView();
    }

    var dMin;

    // var dMax;

    switch (this.view.getDay()){

      case 1:
      this.d1 = new Date(this.view);
      this.d1.setHours(23)

      this.d2 = new Date(this.d1);
      this.d2.setDate(this.d1.getDate()+1);

      this.d3 = new Date(this.d1);
      this.d3.setDate(this.d1.getDate()+2);

      this.d4 = new Date(this.d1);
      this.d4.setDate(this.d1.getDate()+3);

      this.d5 = new Date(this.d1);
      this.d5.setDate(this.d1.getDate()+4);

      this.d6 = new Date(this.d1);
      this.d6.setDate(this.d1.getDate()+5);

      this.d0 = new Date(this.d1);
      this.d0.setDate(this.d1.getDate()+6);

      dMin=new Date(this.d1);
      dMin.setDate(this.d1.getDate()-1);
      // dMax=new Date(date + 4*dayMs);

      this.r4 = await this.fetchRides(this.d3, this.d4);
      this.r3 = await this.fetchRides(this.d2, this.d3);
      this.r2 = await this.fetchRides(this.d1, this.d2);
      this.r1 = await this.fetchRides(dMin, this.d1);
      this.r5 = await this.fetchRides(this.d4, this.d5);
      this.r6 = await this.fetchRides(this.d5, this.d6);
      this.r0 = await this.fetchRides(this.d6, this.d0);

        break
      case 2:
      this.d2 = new Date(this.view);
      this.d2.setHours(23)

      this.d1 = new Date(this.d2);
      this.d1.setDate(this.d2.getDate()-1);

      this.d3 = new Date(this.d2);
      this.d3.setDate(this.d2.getDate()+1);

      this.d4 = new Date(this.d2);
      this.d4.setDate(this.d2.getDate()+2);

      this.d5 = new Date(this.d2);
      this.d5.setDate(this.d2.getDate()+3);

      this.d6 = new Date(this.d2);
      this.d6.setDate(this.d2.getDate()+4);

      this.d0 = new Date(this.d2);
      this.d0.setDate(this.d2.getDate()+5);

      dMin=new Date(this.d2);
      dMin.setDate(this.d2.getDate()-2);
      // dMax=new Date(date + 4*dayMs);

      this.r4 = await this.fetchRides(this.d3, this.d4);
      this.r3 = await this.fetchRides(this.d2, this.d3);
      this.r2 = await this.fetchRides(this.d1, this.d2);
      this.r1 = await this.fetchRides(dMin, this.d1);
      this.r5 = await this.fetchRides(this.d4, this.d5);
      this.r6 = await this.fetchRides(this.d5, this.d6);
      this.r0 = await this.fetchRides(this.d6, this.d0);
        break

      case 3:
      this.d3 = new Date(this.view);
      this.d3.setHours(23)

      this.d2 = new Date(this.d3);
      this.d2.setDate(this.d3.getDate()-1);

      this.d1 = new Date(this.d3);
      this.d1.setDate(this.d3.getDate()-2);

      this.d4 = new Date(this.d3);
      this.d4.setDate(this.d3.getDate()+1);

      this.d5 = new Date(this.d3);
      this.d5.setDate(this.d3.getDate()+2);

      this.d6 = new Date(this.d3);
      this.d6.setDate(this.d3.getDate()+3);

      this.d0 = new Date(this.d3);
      this.d0.setDate(this.d3.getDate()+4);

      dMin=new Date(this.d3);
      dMin.setDate(this.d3.getDate()-3);
      // dMax=new Date(date + 4*dayMs);

      this.r4 = await this.fetchRides(this.d3, this.d4);
      this.r3 = await this.fetchRides(this.d2, this.d3);
      this.r2 = await this.fetchRides(this.d1, this.d2);
      this.r1 = await this.fetchRides(dMin, this.d1);
      this.r5 = await this.fetchRides(this.d4, this.d5);
      this.r6 = await this.fetchRides(this.d5, this.d6);
      this.r0 = await this.fetchRides(this.d6, this.d0);

        break

      case 4:
        this.d4 = new Date(this.view);
        this.d4.setHours(23)

        this.d3 = new Date(this.d4);
        this.d3.setDate(this.d4.getDate()-1);

        this.d2 = new Date(this.d4);
        this.d2.setDate(this.d4.getDate()-2);

        this.d1 = new Date(this.d4);
        this.d1.setDate(this.d4.getDate()-3);

        this.d5 = new Date(this.d4);
        this.d5.setDate(this.d4.getDate()+1);

        this.d6 = new Date(this.d4);
        this.d6.setDate(this.d4.getDate()+2);

        this.d0 = new Date(this.d4);
        this.d0.setDate(this.d4.getDate()+3);

        dMin=new Date(this.d4);
        dMin.setDate(this.d4.getDate()-4);
        // dMax=new Date(date + 4*dayMs);

        this.r4 = await this.fetchRides(this.d3, this.d4);
        this.r3 = await this.fetchRides(this.d2, this.d3);
        this.r2 = await this.fetchRides(this.d1, this.d2);
        this.r1 = await this.fetchRides(dMin, this.d1);
        this.r5 = await this.fetchRides(this.d4, this.d5);
        this.r6 = await this.fetchRides(this.d5, this.d6);
        this.r0 = await this.fetchRides(this.d6, this.d0);

        break

      case 5:
        this.d5 = new Date(this.view);
        this.d5.setHours(23)

        this.d4 = new Date(this.d5);
        this.d4.setDate(this.d5.getDate()-1);

        this.d3 = new Date(this.d5);
        this.d3.setDate(this.d5.getDate()-2);

        this.d2 = new Date(this.d5);
        this.d2.setDate(this.d5.getDate()-3);

        this.d1 = new Date(this.d5);
        this.d1.setDate(this.d5.getDate()-4);

        this.d6 = new Date(this.d5);
        this.d6.setDate(this.d5.getDate()+1);

        this.d0 = new Date(this.d5);
        this.d0.setDate(this.d5.getDate()+2);

        dMin=new Date(this.d5);
        dMin.setDate(this.d5.getDate()-5);

        this.r4 = await this.fetchRides(this.d3, this.d4);
        this.r3 = await this.fetchRides(this.d2, this.d3);
        this.r2 = await this.fetchRides(this.d1, this.d2);
        this.r1 = await this.fetchRides(dMin, this.d1);
        this.r5 = await this.fetchRides(this.d4, this.d5);
        this.r6 = await this.fetchRides(this.d5, this.d6);
        this.r0 = await this.fetchRides(this.d6, this.d0);
        break

      case 6:
      this.d6 = new Date(this.view);
      this.d6.setHours(23)

      this.d5 = new Date(this.d6);
      this.d5.setDate(this.d6.getDate()-1);

      this.d4 = new Date(this.d6);
      this.d4.setDate(this.d6.getDate()-2);

      this.d3 = new Date(this.d6);
      this.d3.setDate(this.d6.getDate()-3);

      this.d2 = new Date(this.d6);
      this.d2.setDate(this.d6.getDate()-4);

      this.d1 = new Date(this.d6);
      this.d1.setDate(this.d6.getDate()-5);

      this.d0 = new Date(this.d6);
      this.d0.setDate(this.d6.getDate()+1);

      dMin=new Date(this.d6);
      dMin.setDate(this.d6.getDate()-6);

// calls to future dates can be cut out
      this.r4 = await this.fetchRides(this.d3, this.d4);
      this.r3 = await this.fetchRides(this.d2, this.d3);
      this.r2 = await this.fetchRides(this.d1, this.d2);
      this.r1 = await this.fetchRides(dMin, this.d1);
      this.r5 = await this.fetchRides(this.d4, this.d5);
      this.r6 = await this.fetchRides(this.d5, this.d6);
      this.r0 = await this.fetchRides(this.d6, this.d0);
      break

      case 0:
        // this.d0 = date.getDate();
        // this.d6 = date.getDate()-1;
        // this.d5 = date.getDate()-2;
        // this.d4 = date.getDate()-3;
        // this.d3 = date.getDate()-4;
        // this.d2 = date.getDate()-5;
        // this.d1 = date.getDate()-6;
      break

      default:
    }

  },
  },
mounted(){
  this.assignDatesAndRides();
},
}
</script>

<style>
td{
  width:150px;
  padding: 15px;
}
span{
  padding: 0px 10px;
}
</style>
