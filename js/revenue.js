const db = firebase.firestore();
let totalRevenue 

const getRevenue = () => db.collection("revenue").get();

const onGetRevenue = (callback) => db.collection("revenue").onSnapshot(callback);

window.addEventListener("DOMContentLoaded", async (e) => {
    onGetRevenue((querySnapshot) => {
      let arrayValue =[]
      querySnapshot.forEach((doc) => {
        arrayValue.push( parseInt(doc.data().value))
      })
      totalRevenue = arrayValue.reduce((a, b) => a + b, 0);
      document.getElementById('totalRevenue').innerHTML = `${totalRevenue}`
   
    })
  })