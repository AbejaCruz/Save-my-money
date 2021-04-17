const db = firebase.firestore()
const form = document.getElementById('form')
const expensesContainer = document.getElementById('expenses')
const revenuesContainer = document.getElementById('revenues')

let editStatus = 0
let id = ''

const getExpenses = () => db.collection('expenses').get()
const onGetExpenses = (callback) => db.collection('expenses').onSnapshot(callback)
const deleteExpenses = (id) => db.collection("expenses").doc(id).delete()
const getExpense = (id) => db.collection("expenses").doc(id).get()
const updateExpense = (id, updatedExpense) => db.collection("expenses").doc(id).update(updatedExpense);

const getRevenues = () => db.collection('revenues').get()
const onGetRevenues = (callback) => db.collection('revenues').onSnapshot(callback)
const deleteRevenues = (id) => db.collection("revenues").doc(id).delete()
const getRevenue = (id) => db.collection("revenues").doc(id).get()
const updateRevenue = (id, updateRevenue) => db.collection("revenues").doc(id).update(updateRevenue);

window.addEventListener('DOMContentLoaded', async (e) => {

    onGetExpenses((querySnapshop) => {
        expensesContainer.innerHTML = ''
        querySnapshop.forEach(doc => {

            expensesContainer.innerHTML += `
            <div style="color:red">
            <h3>${doc.data().type}</h3>
                <p>
                ${doc.data().value}
                </p>
                <p>${doc.data().date}</p>
                </div>
                <button class="btn-delete"  data-id="${doc.id}">delete</button>
                <button class="btn-edit" data-id="${doc.id}">edit</button>
              
            `
        })

        const btnsDelete = expensesContainer.querySelectorAll(".btn-delete")
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async (e) => {
                try {
                    await deleteExpenses(e.target.dataset.id)
                } catch (error) {
                    console.log(error)
                }
            })
        )

        const btnsEdit = expensesContainer.querySelectorAll(".btn-edit")
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getExpense(e.target.dataset.id)
                    const task = doc.data()

                    form['form-value'].value = task.value
                    form['form-name'].value = task.type
                    form['form-date'].value = task.date

                    id = doc.id
                    editStatus = 1

                } catch (error) {
                    console.log(error)
                }
            })
        })

    })

    onGetRevenues((querySnapshop) => {
        revenuesContainer.innerHTML = ''
        querySnapshop.forEach(doc => {

            revenuesContainer.innerHTML += `
         <div style="color:green">
         <h3>${doc.data().type}</h3>
             <p>
             ${doc.data().value}
             </p>
             <p>${doc.data().date}</p>
             </div>
             <button class="btn-delete"  data-id="${doc.id}">delete</button>
             <button class="btn-edit" data-id="${doc.id}">edit</button>
           
         `
        })
        const btnsDelete = revenuesContainer.querySelectorAll(".btn-delete")
        btnsDelete.forEach((btn) =>
            btn.addEventListener("click", async (e) => {
                try {
                    await deleteRevenues(e.target.dataset.id)
                } catch (error) {
                    console.log(error)
                }
            })
        )

        const btnsEdit = revenuesContainer.querySelectorAll(".btn-edit")
        btnsEdit.forEach((btn) => {
            btn.addEventListener("click", async (e) => {
                try {
                    const doc = await getRevenue(e.target.dataset.id)
                    const task = doc.data()

                    form['form-value'].value = task.value
                    form['form-name'].value = task.type
                    form['form-date'].value = task.date

                    id = doc.id
                    editStatus = 2

                } catch (error) {
                    console.log(error)
                }
            })
        })

    })
})

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const value = form['form-value']
    const type = form['form-name']
    const date = form['form-date']

    try {
        if (editStatus == 1) {
            await updateExpense(id, {
                value: value.value,
                type: type.value,
                date: date.value,
            })
        }
        if (editStatus == 2) {
            await updateRevenue(id, {
                value: value.value,
                type: type.value,
                date: date.value,
            })
        }

        editStatus = 0
        id = ''
        form.reset()
    } catch (error) {
        console.log(error)
    }
})