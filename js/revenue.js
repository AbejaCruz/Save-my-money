const db = firebase.firestore()

window.addEventListener("DOMContentLoaded", async (e) => {
  let expenses = 0,  revenues = 0, total =0
  let  colorFont = '007cba'
  const updateTotal = () => {
  
    total = revenues - expenses
  
    if (total > 0 && total < 500000) {
      colorFont = 'yellow'
    }
    if(total >= 500000 ){
        colorFont = 'green'
    }
    if(total < 0 ){
        colorFont = 'red'
    }

    document.getElementById("totalRevenue").innerHTML = `$ ${total}`
    document.getElementById("totalRevenue").style.color =  `${colorFont}`

    const circles = document.querySelectorAll(".circle")
    let activeLight = 0
    let valor = revenues - expenses

    function changeLight() {
      circles[activeLight].className = "circle"

      if (valor < 0) {
        activeLight = 0
      } else if (valor > 0) {
        activeLight = 2
      } else {
        activeLight = 1
      }

      const currenLight = circles[activeLight]
      currenLight.classList.add(currenLight.getAttribute("color"))
    }

    changeLight()
  }
  getTotalFor("expenses", (total) => {
    expenses = total
    updateTotal()
  })
  getTotalFor("revenues", (total) => {
    revenues = total
    updateTotal()
  })
})
const getTotalFor = (collection, callback) => {
  db.collection(collection).onSnapshot((querySnapshot) => {
    let arrayValues = []
    querySnapshot.forEach((doc) => {
      arrayValues.push(parseInt(doc.data().value))
    })
    const subTotal = arrayValues.reduce((a, b) => a + b, 0)
    callback(subTotal)
  })
}
