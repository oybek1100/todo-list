const formCreate = document.getElementById('form-create');
const formEdit = document.getElementById('form-edit');
const listGroupTodo = document.getElementById('list-group-todo');
const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');

const fullDay = document.getElementById('full-day');
const hourEl = document.getElementById('hour');
const minuteEl = document.getElementById('minute');
const secondEl = document.getElementById('second');
const closeEl = document.getElementById('close');
let editItemId;
let todos = JSON.parse(localStorage.getItem("list ")) ? JSON.parse(localStorage.getItem("list ")) : [];

if(todos.length) showTodos();

function SetTodos (){
   localStorage.setItem("list" , JSON.stringify(todos))
}

function getTime(){
    const now = new Date();
    const date = now.getDate() < 10 ?  "0" + now.getDate() : now.getDate()
    const month = now. getMonth() < 10 ? "0" + (now.getMonth() + 1 )  : now.getMonth()
    const year = now.getFullYear()
    const hour = now.getHours()  < 10 ?  "0" + now.getHours() :now.getHours()
    const minute = now.getMinutes()  < 10 ?  "0" + now.getMinutes() : now.getMinutes()
    const secode = now.getSeconds()
    const months = ["Yanvar" , "Fevral" , "Mart" , "Aprel" , "May", "Iyun" , "Iyul", "Avgust" , "Sentyabr" , "Oktaybr", "Noyabr", "Dekabr"];

    const month_2 = now. getMonth()       
    fullDay.textContent = `${date} ${months[month_2]} ${year}`
    hourEl.textContent = hour;
    minuteEl.textContent = minute;
    secondEl.textContent = secode;
   return(` ${hour}:${minute} , ${date}.${month}.${year}`);
}
setInterval(getTime , 1000  )

function showTodos (){
    const todos = JSON.parse(localStorage.getItem("list"))
    listGroupTodo.innerHTML = "";
   todos.forEach((item , i) =>{
    listGroupTodo.innerHTML     += `
     <li ondblclick = "setCompleted(${i})"  class="list-group-item d-flex justify-content-between" ${
      item.complete == true ? "complated" : ""
     }>
     ${item.text}
    <div class="todo-icons">
      <span class="opacity-50 me-2"> ${item.time} </span>
      <img onclick = (editTodo(${i})) src="./888_edit.jpg" alt="edit-icon" width="40px" height="35px">
      <img onclick = (deleteTodo(${i})) src="./Без названия.png" alt="edit-icon" width="25px" height="25px">
    </div>
  </li> 
    `
   })
}
function showMessage (where , message){
    document.getElementById(`${where}`).textContent = message;

setTimeout(() => {
    document.getElementById(`${where}`).textContent = " ";
}, 2500);

}

formCreate.addEventListener("submit" , (e) =>{
    e.preventDefault();
    const todoText = formCreate["input-create"].value.trim()
    formCreate.reset()
    if(todoText.length ){
       todos.push({text:todoText , time : getTime() , completed : false })
       SetTodos();
       showTodos();
    }
    else{showMessage("message-create" , "plese enter some text  ")};
})

function deleteTodo(id){
  const deletedTodos = todos.filter((item , i)=>{
    return i !== id
  })
todos = deletedTodos;
SetTodos();
showTodos();
}
function setCompleted(id){
  const completedTodos  = todos.map((item, i)=>{
    if(id == i ){
      return { ... item , completed : item.completed == true ? false : true }
    } else{return {... item}}
  })
  todos = completedTodos;
  SetTodos();
  showTodos(  )
}
formEdit.addEventListener('submit' , (e)=>{
  e.preventDefault()
  const todoText = formEdit["input-edit"].value.trim()
  formEdit.reset()
  if(todoText.length ){
     todos.splice(editItemId, 1,{text:todoText , time : getTime() , completed : false })
     SetTodos();
     showTodos();
    close()
  }
  else{showMessage("message-edit" , "plese enter some text  ")};

})
function open (){
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  
}
overlay.addEventListener("click" , close)
closeEl.addEventListener("click" , close)
document.addEventListener("keydown" ,(e)=>{
  if(e.which == 27){
    close()
  }else{

  }
})
function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
function editTodo(id){
  open()
  editItemId = id;
}