const db = firebase.firestore();

window.addEventListener("DOMContentLoaded", async (e) => {
    let expenses = 0, revenues = 0
    const updateTotal = () => {
        console.log()
        document.getElementById('totalRevenue').innerHTML = `${revenues-expenses}`
    }
    getTotalFor('expenses', (total) =>{
        console.log('expenses:'+total)
        expenses=total
        updateTotal()

    })
    getTotalFor('revenue', (total) =>{
        console.log('revenues:'+total)
        revenues=total
        updateTotal()
    })
 })
const getTotalFor =  (collection, callback) => {
  
   db.collection(collection).onSnapshot(
       (querySnapshot) => {
            let arrayValues = []
            querySnapshot.forEach((doc) => {
                arrayValues.push(parseInt(doc.data().value))
            })
           const subTotal = arrayValues.reduce((a, b) => a + b, 0);
           callback(subTotal)
        }
    )
   
}
