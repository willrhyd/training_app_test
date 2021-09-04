<template>
<div>
  <fileUpload  @submittingRides='ridesSubmitting(true)' v-on:ridesSubmitted='ridesSubmitting(false)'/>
  <!-- <button  @click="showDialog(false)">Close</button> -->
  <button v-on:click="moveWeekBack">Back 1 Week</button>
  <!-- <span>{{this.d1.toDateString()}}</span> -->
  <button v-on:click="moveWeekForward">Forward 1 Week</button>

  <div class="submitting" v-if='submittingRides' @submittingRides='ridesSubmitting(true)' >Submitting</div>

  <div class="weekdays">
    <div class="weekday">Monday</div>
    <div class="weekday">Tuesday</div>
    <div class="weekday">Wednesday</div>
    <div class="weekday">Thursday</div>
    <div class="weekday">Friday</div>
    <div class="weekday">Saturday</div>
    <div class="weekday">Sunday</div>
  </div>

  <div class="calendar">
    <div class="day" v-for="day in days" :key="day.date">
      <div v-if="day.date.getDate()==1">
        {{day.date.getDate()}} {{day.date.toLocaleString('default', { month: 'short' })}}
      </div>
      <div v-else>
        {{day.date.getDate()}}
      </div>

      <div v-for="activity in day.activities" :key="activity.distance">
        <button class="rideButton" @click="fetchSingleRide(activity.id); singleRideViewToggle(true); "></button>
        <p>Dist: {{Math.round(activity.distance)}}km</p>
        <p>NP: {{Math.round(activity.np)}}w</p>
        <p>TSS: {{Math.round(activity.tss)}}</p>
      </div>
    </div>
<transition name="flip">
  <singleRideView v-if="singleRideVisible" :singleRideViewToggle="singleRideVisible" @singleRideViewEvent="singleRideViewToggle" :selected-ride="selectedRide" v-on:closeSingleView="singleRideViewToggle(false)">
</singleRideView></transition>

  </div>
  <div>Icons made by <a href="https://www.freepik.com" title='Freepik'> Freepik</a> from <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a></div>
</div>
</template>

<script>
import singleRideView from './singleRide.vue'
import fileUpload from './upload.vue'
import axios from 'axios';
export default {
  name: "calendar",
  components: {
    singleRideView,
    fileUpload
  },
  props: ['selectedRide'],
  data() {
    return {
      days: [],
      view: null,
      singleRideVisible: false,
      submittingRides: false,
    }
  },
  methods: {
    ridesSubmitting(submitting){
      console.log('Submitting event triggered: ' + submitting)
      this.submittingRides = submitting;
    },

    singleRideViewToggle(visible) {
      this.singleRideVisible = visible;

    },
    // Currently mutating the prop directly which is apparently an anti-pattern but works well enough for now
    async fetchSingleRide(id) {
      console.log(id);
      this.selectedRide = await axios.get('http://localhost:3000/showRide/' + id)
        .catch(function(error) {
          console.log(error);
        })

    },
    async fetchRides(dateOne, dateTwo) {
      return axios.get('http://localhost:3000/showRides/' + dateOne + '.' + dateTwo)
        .catch(function(error) {
          console.log(error);
        })

    },

    setInitialView() {
      this.view = new Date()
    },

    moveWeekBack() {
      this.view.setDate(this.view.getDate() - 7);
      this.assignDatesAndRides();
    },

    moveWeekForward() {
      this.view.setDate(this.view.getDate() + 7);
      this.assignDatesAndRides();
    },
    async assignDatesAndRides() {
      this.days = [];
      if (this.view == null) {
        this.setInitialView();
      }
      var i;

      switch (this.view.getDay()) {

        case 1:
          for (i = 0; i < 28; i++) {
            // console.log(i);
            let day = {
              date: new Date(this.view),
              activities: []
            }
            day.date.setDate(this.view.getDate() + i - 14)
            this.days.push(day);
          }
          break

        case 2:
          for (i = 0; i < 28; i++) {
            // console.log(i);
            let day = {
              date: new Date(this.view),
              activities: []
            }
            day.date.setDate(this.view.getDate() + i - 15)

            this.days.push(day);

            // console.log(this.days[0].date);
          }

          break

        case 3:
          for (i = 0; i < 28; i++) {
            // console.log(i);
            let day = {
              date: new Date(this.view),
              activities: []
            }
            day.date.setDate(this.view.getDate() + i - 16)

            this.days.push(day);

            // console.log(this.days[0].date);
          }
          break

        case 4:
          for (i = 0; i < 28; i++) {
            // console.log(i);
            let day = {
              date: new Date(this.view),
              activities: []
            }
            day.date.setDate(this.view.getDate() + i - 17)

            this.days.push(day);
          }

          break

        case 5:
          for (i = 0; i < 28; i++) {
            // console.log(i);
            let day = {
              date: new Date(this.view),
              activities: []
            }
            day.date.setDate(this.view.getDate() + i - 18)

            this.days.push(day);
            // console.log(this.days[0].date);
          }
          break

        case 6:
          for (i = 0; i < 28; i++) {
            // console.log(i);
            let day = {
              date: new Date(this.view),
              activities: []
            }
            day.date.setDate(this.view.getDate() + i - 19)

            this.days.push(day);
          }

          break

        case 0:
        for (i = 0; i < 28; i++) {
          // console.log(i);
          let day = {
            date: new Date(this.view),
            activities: []
          }
          day.date.setDate(this.view.getDate() + i - 20)

          this.days.push(day);
        }
          break

        default:
      }

      try {
        var data = await this.fetchRides(this.days[0].date.setHours(0, 0), this.days[27].date+1);
        if (data.data != null) {
          console.log(data)
          data.data.forEach((activity) => {
            console.log(activity)
            for (i = 0; i < 28; i++) {
              var activityDate = new Date(Date.parse(activity.date))
              if (activityDate.getDate() == this.days[i].date.getDate()) {
                this.days[i].activities.push(activity)
              }
            }
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  mounted() {
    this.assignDatesAndRides()
  }
}
</script>

<style>
.calendar {
  display: flex;
  flex-wrap: wrap;

}

.day {
  border: solid;
  border-width: thin;
  flex: 1 0 13%;

  max-width: 13%;
  padding: 20px 0;
}

.weekdays {
  display: flex;
  flex-wrap: wrap;
  padding: 50px 0 0 0;

}

.weekday {
  border: solid;
  border-width: thin;
  flex: 1 0 13%;
  max-width: 13%;

}
.rideButton{
  background-color: #04AA6D;
  border-radius:50%;
  height:25px;
  width:25px;
}
.submitting{
  border-color: black;
  border-width: thin;
  border-style: solid;
  background: white;
  padding:2.5%;
  position: absolute;

  right: 40%;
  top: 40%;
}
span {
  padding: 0px 10px;
}

</style>
