const db = firebase.firestore()

window.addEventListener("DOMContentLoaded", async (e) => {
    let expenses = 0,
        revenues = 0
    const updateTotal = () => {
        document.getElementById('totalRevenue').innerHTML = `${revenues-expenses}`

        const circles = document.querySelectorAll('.circle')
let activeLight = 0;
let valor = revenues-expenses;

console.log(circles)


function changeLight() {
    circles[activeLight].className = 'circle';

    if(valor<0){
        activeLight=0;
    }else if(valor>0){
        activeLight=2
    }else{
        activeLight=1
    }
    
    const currenLight = circles[activeLight];
        currenLight.classList.add(currenLight.getAttribute('color'))
       
}


changeLight();
console.log(activeLight)
        

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