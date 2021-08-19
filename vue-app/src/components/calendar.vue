<template>
  <div>
    <fileUpload />
    <!-- <button  @click="showDialog(false)">Close</button> -->
    <button v-on:click="moveWeekBack">Back 1 Week</button>
    <!-- <span>{{this.d1.toDateString()}}</span> -->
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
    <tr id="array-rendering">
      <td v-for="day in days" :key="day.date" >
        {{day.date.getDate()}}
        <div v-for="activity in day.activities" :key="activity.distance" >
          <button  @click="fetchSingleRide(activity.id); singleRideViewToggle(true); " >{{activity.id}}<img src="/cycling.png"></button>
          <span>Distance: {{activity.distance}}km</span>
          <span>Normalised Power: {{activity.np}}w</span>

        </div>
      </td>
    </tr>
  </table>
  <singleRideView
  v-show="singleRideVisible"
    :singleRideViewToggle="singleRideVisible"
    @singleRideViewEvent="singleRideViewToggle"
    :selected-ride="selectedRide"
    v-on:closeSingleView="singleRideViewToggle(false)">


  </singleRideView>
  <div>Icons made by <a href="https://www.freepik.com" title= 'Freepik'> Freepik</a> from <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a></div>
  </div>
</template>

<script>
import singleRideView from './singleRide.vue'
import fileUpload from './upload.vue'
import axios from 'axios';
export default{
  name: "calendar",
  components:{
    singleRideView,
    fileUpload
  },
  props: ['selectedRide'],
  data(){
    return{
    days:[],
    view: null,
    singleRideVisible: false,

    }
},

methods: {
  singleRideViewToggle(visible) {
      this.singleRideVisible = visible;

    },
// Currently mutating the prop directly which is apparently an anti-pattern but works well enough for now
    async fetchSingleRide(id){
    console.log(id);
    this.selectedRide = await axios.get('http://localhost:3000/showRide/'+id)
        .catch(function (error) {console.log(error);})

      },
  async fetchRides(dateOne, dateTwo){
    return axios.get('http://localhost:3000/showRides/'+dateOne+'.'+dateTwo)
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
    this.days = [];
    if (this.view == null){
      this.setInitialView();
    }
    var i;
    var d;
    var data;

    switch (this.view.getDay()){

      case 1:
      for (i=0;i<7;i++){
          // console.log(i);
          let day = {
            date: new Date (this.view),
            activities:[]
          }
          day.date.setDate(this.view.getDate()+i)
          this.days.push(day);
          // console.log(this.days[0].date);
        }
        console.log(this.days)

        data = await this.fetchRides(this.days[0].date.setHours(0, 0), this.days[6].date+1);
        try {
          if (data.data != null){
            data.data.forEach((activity) =>{
              var activityDate = new Date(activity.date)

              switch (activityDate.getDay()){
                case 1:
                  this.days[0].activities.push(activity);
                break
                case 2:
                  this.days[1].activities.push(activity);
                break
                case 3:
                  this.days[2].activities.push(activity);
                break
                case 4:
                  this.days[3].activities.push(activity);
                break
                case 5:
                  this.days[4].activities.push(activity);
                break
                case 6:
                  this.days[5].activities.push(activity);
                break
                case 0:
                  this.days[6].activities.push(activity);
                break
              }
            })
          }
        }
          catch (err){
            if(err){console.log(err)}
          }

        break

      case 2:
      for (i=0;i<7;i++){
        // console.log(i);
        let day = {
          date: new Date (this.view),
          activities:[]
        }
        day.date.setDate(this.view.getDate()+i-1)

        this.days.push(day);

        // console.log(this.days[0].date);
      }
      console.log(this.days)

      data = await this.fetchRides(this.days[0].date.setHours(0, 0), this.days[6].date+1);

        if (data.data != null){
          data.data.forEach(activity =>{
            var activityDate = new Date(activity.date)

            switch (activityDate.getDay()){
              case 1:
                this.days[0].activities.push(activity);
              break
              case 2:
                this.days[1].activities.push(activity);
              break
              case 3:
                this.days[2].activities.push(activity);
              break
              case 4:
                this.days[3].activities.push(activity);
              break
              case 5:
                this.days[4].activities.push(activity);
              break
              case 6:
                this.days[5].activities.push(activity);
              break
              case 0:
                this.days[6].activities.push(activity);
              break
            }
          })
        }
        break

      case 3:
      for (i=0;i<7;i++){
        // console.log(i);
        let day = {
          date: new Date (this.view),
          activities:[]
        }
        day.date.setDate(this.view.getDate()+i-2)

        this.days.push(day);

        // console.log(this.days[0].date);
      }
      console.log(this.days)

      data = await this.fetchRides(this.days[0].date.setHours(0, 0), this.days[6].date+1);

        if (data.data != null){
          data.data.forEach(activity =>{
            var activityDate = new Date(activity.date)

            switch (activityDate.getDay()){
              case 1:
                this.days[0].activities.push(activity);
              break
              case 2:
                this.days[1].activities.push(activity);
              break
              case 3:
                this.days[2].activities.push(activity);
              break
              case 4:
                this.days[3].activities.push(activity);
              break
              case 5:
                this.days[4].activities.push(activity);
              break
              case 6:
                this.days[5].activities.push(activity);
              break
              case 0:
                this.days[6].activities.push(activity);
              break
            }
          })
        }

        break

      case 4:
        for (i=0;i<7;i++){
          // console.log(i);
          let day = {
            date: new Date (this.view),
            activities:[]
          }
          day.date.setDate(this.view.getDate()+i-3)

          this.days.push(day);
        }
        // dMax=new Date(date + 4*dayMs);

        data = await this.fetchRides(this.days[0].date.setHours(0, 0), this.days[6].date+1);

          if (data.data != null){
            data.data.forEach(activity =>{

              var activityDate = new Date(activity.date)
              switch (activityDate.getDay()){
                case 1:
                  this.days[0].activities.push(activity);
                break
                case 2:
                  this.days[1].activities.push(activity);
                break
                case 3:
                  this.days[2].activities.push(activity);
                break
                case 4:
                  this.days[3].activities.push(activity);
                break
                case 5:
                  this.days[4].activities.push(activity);
                break
                case 6:
                  this.days[5].activities.push(activity);
                break
                case 0:
                  this.days[6].activities.push();
                break
              }
            })
          }
          console.log(this.days[6].activities)
        break

      case 5:
        for (i=0;i<7;i++){
          // console.log(i);
          let day = {
            date: new Date (this.view),
            activities:[]
          }
          day.date.setDate(this.view.getDate()+i-4)

          this.days.push(day);
          // console.log(this.days[0].date);
        }

        data = await this.fetchRides(this.days[0].date.setHours(0, 0), this.days[6].date+1);

          if (data.data != null){
            data.data.forEach(activity =>{
              var activityDate = new Date(activity.date)

              switch (activityDate.getDay()){
                case 1:
                  this.days[0].activities.push(activity);
                break
                case 2:
                  this.days[1].activities.push(activity);
                break
                case 3:
                  this.days[2].activities.push(activity);
                break
                case 4:
                  this.days[3].activities.push(activity);
                break
                case 5:
                  this.days[4].activities.push(activity);
                break
                case 6:
                  this.days[5].activities.push(activity);
                break
                case 0:
                  this.days[6].activities.push(activity);
                break
              }
            })
          }
        break

      case 6:
        for (i=0;i<7;i++){
          // console.log(i);
          let day = {
            date: new Date (this.view),
            activities:[]
          }
          day.date.setDate(this.view.getDate()+i-5)

          this.days.push(day);

          // console.log(this.days[0].date);
        }
        console.log(this.days)

        data = await this.fetchRides(this.days[0].date.setHours(0, 0), this.days[6].date+1);

          if (data.data != null){
            data.data.forEach(activity =>{
              var activityDate = new Date(activity.date)

              switch (activityDate.getDay()){
                case 1:
                  this.days[0].activities.push(activity);
                break
                case 2:
                  this.days[1].activities.push(activity);
                break
                case 3:
                  this.days[2].activities.push(activity);
                break
                case 4:
                  this.days[3].activities.push(activity);
                break
                case 5:
                  this.days[4].activities.push(activity);
                break
                case 6:
                  this.days[5].activities.push(activity);
                break
                case 0:
                  this.days[6].activities.push(activity);
                break
              }
            })
          }


        console.log(this.days[0].activities);


// calls to future dates can be cut out

      break

      case 0:
        for (i=0;i<7;i++){
          // console.log(i);
          d = new Date (this.view)
          d.setDate(this.view.getDate()+i-6)
          this.days.push(Object.create(this.days));
          this.days[i].date=new Date(d);
          // console.log(this.days[0].date);
        }
        data = await this.fetchRides(this.days[0].date.setHours(0, 0), this.days[6].date+1);

          if (data.data != null){
            data.data.forEach(activity =>{
              var activityDate = new Date(activity.date)

              switch (activityDate.getDay()){
                case 1:
                  this.days[0].activities.push(activity);
                break
                case 2:
                  this.days[1].activities.push(activity);
                break
                case 3:
                  this.days[2].activities.push(activity);
                break
                case 4:
                  this.days[3].activities.push(activity);
                break
                case 5:
                  this.days[4].activities.push(activity);
                break
                case 6:
                  this.days[5].activities.push(activity);
                break
                case 0:
                  this.days[6].activities.push(activity);
                break
              }
            })
          }
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
