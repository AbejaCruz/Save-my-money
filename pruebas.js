const db = firebase.firestore();
const form = document.getElementById('form');
const taskContainer =document.getElementById('taskContainer')

const saveTask = (name,valor,date)=>{
    db.collection('tasks').doc().set({
        name,
        valor,
        date 
    })
}

const getTasks = () => db.collection('tasks').get();
const onGetTasks = (callback) => db.collection('tasks').onSnapshot(callback)

window.addEventListener('DOMContentLoaded', async(e) => {

   onGetTasks((querySnapshop) => {
       taskContainer.innerHTML= '';
       querySnapshop.forEach(doc => {
           console.log(doc.data())
        const task = doc.data();
    
            taskContainer.innerHTML+=`
                <p>
                ${doc.data().valor}
                </p>
                <button class="btn-delite">delite</button>
                <button class="btn-edit">edit</button>
            `
const btnDelite = document.querySelectorAll('.btn-delite')
console.log(btnDelite)

       });
       
   })
})

form.addEventListener('submit', async (e) =>{
    e.preventDefault();  

    const name = form['form-name'];
    const valor = form['form-valor'];
    const date = form['form-date'];
    
    await  saveTask(name.value, valor.value, date.value);
    
    form.reset();
    valor.focus();  
})