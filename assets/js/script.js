'use strict'

let tasks = []
const tasksList = document.getElementById('tasks-list')

function addItemFunc(taskText) {

// -- create list item start --
const li = document.createElement('li')
li.classList.add('tasks-item')
tasksList.append(li)

const input = document.createElement('input')
input.classList.add('item-input')
input.value = taskText
input.setAttribute('disabled' , 'disabled')
li.append(input)

const inputError = document.createElement('p')
inputError.classList.add('hide','text-red-600' , 'text-sm' , 'mt-[-15px]' , 'ml-1')
inputError.textContent = 'Please enter content !'
li.after(inputError)


const div = document.createElement('div')
div.classList.add('btn-group')
li.append(div)

const editBtn = document.createElement('button')
editBtn.classList.add('editBtn' ,'btn','order-3')
div.append(editBtn)

const removeBtn = document.createElement('button')
removeBtn.classList.add('removeBtn','btn','order-4')
div.append(removeBtn)

const editIcon = document.createElement('i')
editIcon.classList.add('fa-solid' , 'fa-pen-to-square')
editBtn.append(editIcon)

const removeIcon = document.createElement('i')
removeIcon.classList.add('fa-solid' , 'fa-trash')
removeBtn.append(removeIcon)
// hide buttons
const cancelBtn = document.createElement('button')
cancelBtn.classList.add('cancelBtn' , 'btn' , 'hide' , 'order-1')
div.append(cancelBtn)

const cancelIcon = document.createElement('i')
cancelIcon.classList.add('fa-solid' , 'fa-xmark')
cancelBtn.append(cancelIcon)

const confirmBtn = document.createElement('button')
confirmBtn.classList.add('confirmBtn' , 'btn' , 'hide','order-2')
div.append(confirmBtn)

const confirmIcon = document.createElement('i')
confirmIcon.classList.add('fa-solid' , 'fa-check')
confirmBtn.append(confirmIcon)

// -- create list item end --

}

// show old tasks
document.addEventListener("DOMContentLoaded", () => {

    if(localStorage.getItem('tasks') === null){
        return
    }

    let getTasks = JSON.parse(localStorage.getItem('tasks'))

    tasks = getTasks

    tasks.forEach(taskText => {
        addItemFunc(taskText)
    })

    editBtnFunc()
    removeBtnFunc()
});


// -- add process start --
const addBtn = document.getElementById('addBtn')
const addInput = document.getElementById('add-task-input')
const itemInputs = document.querySelectorAll('.item-input')


// push task text in tasks array and save in localStorage
function updateTasks() {

    tasks.push(addInput.value)

    // update localStorage
    let stringTasks = JSON.stringify(tasks)
    localStorage.setItem('tasks' , stringTasks)
}

addBtn.addEventListener('click' , () => {
    let inputErrText = document.getElementById('input-error')
    if(addInput.value.trim() === '') {
        inputErrText.classList.remove('hide')
        return
    }
    if(addInput.value.trim() !== '') {
        inputErrText.classList.add('hide')
    }

    updateTasks()

    addItemFunc(addInput.value)

    addInput.value = ''

    addInput.focus()

    editBtnFunc()

    removeBtnFunc()
})


// add scrollbar padding
addBtn.addEventListener('click' , () => {

    if(tasksList.childElementCount > 5) {

        tasksList.classList.add('pr-2')

        return;
    }

})



// access key
addInput.addEventListener('keydown' , (event) => {

    if(event.key === 'Enter'){

        addBtn.click()

    }

})
// -- add process end --

// -- edit process start --

function editBtnFunc() {
    const editBtns = [...document.querySelectorAll('.editBtn')]

    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click' , () => {

            // add hide class to edit button
            editBtn.classList.add('hide')

            // add show class to confirm button
            editBtn.parentElement.lastElementChild.classList.replace('hide' , 'show')

            // add show class to cancel button
            editBtn.parentElement.lastElementChild.previousElementSibling.classList.replace('hide' , 'show')

            // remove disabled from input item
            editBtn.parentElement.parentElement.firstElementChild.removeAttribute('disabled')

            // focus on the input
            editBtn.parentElement.parentElement.firstElementChild.focus()

            // send old text in input to cancelBtnFunc and run that
            cancelBtnFunc(editBtn.parentElement.parentElement.firstElementChild.value)
        })
    })
    confirmBtnFunc()
}

function confirmBtnFunc() {

    const confirmBtns = [...document.querySelectorAll('.confirmBtn')]

    confirmBtns.forEach(confirmBtn => {
        confirmBtn.addEventListener('click' , () => {

            // check input value
            if(confirmBtn.parentElement.parentElement.firstElementChild.value.trim() === '') {
                confirmBtn.parentElement.parentElement.nextSibling.classList.remove('hide')
                confirmBtn.parentElement.parentElement.firstElementChild.focus()
                return
            }else{
                confirmBtn.parentElement.parentElement.nextSibling.classList.add('hide')
            }


            // add hide class to confirm button
            confirmBtn.classList.replace('show' , 'hide')

            // add hide class to cancel button
            confirmBtn.previousElementSibling.classList.replace('show' , 'hide')

            // add show class to edit button
            confirmBtn.parentElement.firstElementChild.classList.replace('hide' , 'show')

            // add disabled to input item
            confirmBtn.parentElement.parentElement.firstElementChild.setAttribute('disabled' , 'disabled')

            // -- update tasks array and localStorage start --

            //get index item
            const index = Array.from(document.getElementById('tasks-list').children).indexOf(confirmBtn.parentElement.parentElement);

            // change task text
            tasks.splice(index, 1, confirmBtn.parentElement.parentElement.firstChild.value);

            let stringTasks = JSON.stringify(tasks)

            // update localStorage
            localStorage.setItem('tasks' , stringTasks)

            // -- update tasks array and localStorage end --

        })
    })
}

function cancelBtnFunc(oldTaskText) {

    const cancelBtns = [...document.querySelectorAll('.cancelBtn')]

    cancelBtns.forEach(cancelBtn => {

        cancelBtn.addEventListener('click' , () => {
            // add hide class to cancel button
              cancelBtn.classList.replace('show' , 'hide')

            // add hide class to confirm button
              cancelBtn.nextElementSibling.classList.replace('show' , 'hide')

            // add show class to edit button
              cancelBtn.parentElement.firstElementChild.classList.replace('hide' , 'show')

            // input item value = oldTaskText
              cancelBtn.parentElement.parentElement.firstElementChild.value = oldTaskText

            // add disabled to input item
              cancelBtn.parentElement.parentElement.firstElementChild.setAttribute('disabled' , 'disabled')
        })
    })
}

// -- edit process end --

// -- remove process start --
function removeBtnFunc() {
    let removeBtns = [...document.querySelectorAll('.removeBtn')]

    removeBtns.forEach(removeBtn => {

        removeBtn.addEventListener('click' , () => {

            // get index
            const index = Array.from(document.getElementById('tasks-list').children).indexOf(removeBtn.parentElement.parentElement);

            // remove task
            document.getElementById('dialog').showModal()
            document.getElementById('yesModal').addEventListener('click' , () => {
                removeBtn.parentElement.parentElement.remove()
            })

            // remove task from tasks array
            tasks.splice(index , 1)

            // update localStorage
            let stringTasks = JSON.stringify(tasks)
            localStorage.setItem('tasks' , stringTasks)

        })
    })
}
// -- remove process end --
