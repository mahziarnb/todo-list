'use strict'

let tasks = []

const addTask = document.getElementById('add-task')

// add task process start
addTask.addEventListener('click' , () => {
    let taskText = document.getElementById('add-task-input').value
    tasks.push(taskText)
    console.log(`tasks : ${tasks}`)
    addTaskFunc(taskText)
    // add listener for new trashBtn
    createRemoveListener()
    createEditListener()
})

function addTaskFunc(taskText) {

    //-----------create task start---------
    // container
    const taskContainer = document.createElement('div')
    taskContainer.classList.add('text-container', 'flex' , 'items-center' , 'justify-between' , 'bg-tint' , 'py-[.7rem]' , 'px-4' , 'text-light', 'rounded-md')

    // text
    let task = document.createElement('p')
    task.classList.add('task','text-[.93rem]','font-medium')
    task.id ='task'

    // buttons and icons
    const buttons = document.createElement('div')
    buttons.classList.add('buttons')
    // edit button
    const editBtn = document.createElement('button')
    editBtn.classList.add('editButton','cursor-pointer','hover:text-shade/80','transition','duration-150','ease-in-out')
    // edit icon
    const editIcon = document.createElement('i')
    editIcon.classList.add('fa-solid','fa-pen-to-square')
    // trash button
    const trashBtn = document.createElement('button')
    trashBtn.classList.add('trashButton','cursor-pointer','hover:text-shade/80','transition','duration-150','ease-in-out')
    // trash icon
    const trashIcon = document.createElement('i')
    trashIcon.classList.add('fa-solid','fa-trash')

    // add icon in button
    editBtn.append(editIcon)
    trashBtn.append(trashIcon)

    // add buttons in buttons parent
    buttons.append(editBtn)
    buttons.append(trashBtn)

    // add task in taskContainer
    taskContainer.append(task)

    // add buttons in taskContainer
    taskContainer.append(buttons)

    // add in html
    let tasksDiv = document.getElementById('tasks-div')

    //-----------create task end---------

    // add text in p tag and add task in html
        // task.textContent = tasks[tasks.length - 1]
        task.textContent = taskText
        tasksDiv.append(taskContainer)

    // add trashBtn in trashButtons array
        trashButtons.push(trashBtn)

}
// add task process end

// remove task process start
const trashButtons = [...document.querySelectorAll('.trashButton')]

function createRemoveListener() {

    trashButtons.forEach((item) => {

        item.addEventListener('click' , () => {

            item.parentElement.parentElement.remove()

        })
    })
}
// remove task process end

// edit task process start

function createEditListener() {
    let editButtons = [...document.querySelectorAll('.editButton')]
    editButtons.forEach(item => {
        item.addEventListener('click' , () => {
        let index = editButtons.indexOf(item)
        let newTask = prompt(`text : ${tasks[index]}`)
        item.parentElement.parentElement.remove()
        addTaskFunc(newTask)
    })
})
}
