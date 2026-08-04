'use strict'

let tasks = []

let taskText = document.getElementById('add-task-input').value

const addTask = document.getElementById('add-task')


// add task process

addTask.addEventListener('click' , () => {
    tasks.push(taskText)
    console.log(tasks)
    addTaskFunc(taskText)
})
console.log(tasks)

function addTaskFunc(taskText) {

}
