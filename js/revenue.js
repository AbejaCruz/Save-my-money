const db = firebase.firestore()

window.addEventListener("DOMContentLoaded", async (e) => {
    let expenses = 0,
        revenues = 0
    const updateTotal = () => {
        document.getElementById('totalRevenue').innerHTML = `${revenues-expenses}`
    }
    getTotalFor('expenses', (total) => {
        expenses = total
        updateTotal()
    })
    getTotalFor('revenues', (total) => {
        revenues = total
        updateTotal()
    })
})
const getTotalFor = (collection, callback) => {

    db.collection(collection).onSnapshot(
        (querySnapshot) => {
            let arrayValues = []
            querySnapshot.forEach((doc) => {
                arrayValues.push(parseInt(doc.data().value))
            })
            const subTotal = arrayValues.reduce((a, b) => a + b, 0)
            callback(subTotal)
        }
    )

}