// const axios = require('axios');
// const store = require ('../store/store')
//
// console.log(store)
// async function fetchPmc(){
//
//   console.log("Fetch PMC")
//   var data;
//   var labels = [];
//   var ctl = [];
//   try{
//     const pmc = await axios.get('http://localhost:3000/pmc/' )
//     console.log(pmc)
//     pmc.forEach(point =>{
//       labels.push(point.date)
//       ctl.push(point.ctl)
//     })
//     data = {labels: labels, ctl:ctl}
//   } catch(err) {
//     console.log(err)
//   }
//   console.log("DATA:" + data)
//
// }
//
//
// export const pmcData = {
//   type: "line",
//   data: {
//     labels: fetchPmc().labels,
//     datasets: [
//       {
//         label: "CTL",
//         data: fetchPmc().ctl,
//         backgroundColor: "rgba(54,73,93,.5)",
//         borderColor: "#36495d",
//         borderWidth: 3
//       },
//     ]
//   },
//   options: {
//     responsive: true,
//     lineTension: 1,
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//             padding: 25
//           }
//         }
//       ]
//     }
//   }
// };
//
// export default pmcData;
