const db = firebase.firestore()
let totalRevenue 
const form = document.getElementById("form")

function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName('check')
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false

    if (item == checkbox) form.boton.disabled = false
    if (document.getElementById('cbox1').checked == false && document.getElementById('cbox2').checked == false) {
      form.boton.disabled = true
    }
  })
}

const saveExpenses = (value, type, date) =>
  db.collection("expenses").doc().set({
    value,
    type,
    date,
    })

const saveRevenue = (value, type, date) =>
  db.collection("revenues").doc().set({
    value,
    type,
    date,
 
  })


form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const value = form['value']
  const type = form['type']
  const date = form['date']
 

  try {
    if (document.getElementById('cbox1').checked) {
      alert('Gastos Guardados')
      await saveExpenses(value.value, type.value, date.value)
      
    }
    if (document.getElementById('cbox2').checked) {
      alert('Ingresos Guardados')
      await saveRevenue(value.value, type.value, date.value)
    }
    form.reset()
    form.boton.disabled = true
    value.focus()
  } catch (error) {
    console.log(error)
  }
})


