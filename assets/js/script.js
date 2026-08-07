'use strict'
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

const div = document.createElement('div')
div.classList.add('btn-group')
li.append(div)

const editBtn = document.createElement('button')
editBtn.classList.add('editBtn' , 'btn')
div.append(editBtn)

const removeBtn = document.createElement('button')
removeBtn.classList.add('removeBtn' , 'btn')
div.append(removeBtn)

const editIcon = document.createElement('i')
editIcon.classList.add('fa-solid' , 'fa-pen-to-square')
editBtn.append(editIcon)

const removeIcon = document.createElement('i')
removeIcon.classList.add('fa-solid' , 'fa-trash')
removeBtn.append(removeIcon)
// hide buttons
const cancelBtn = document.createElement('button')
cancelBtn.classList.add('cancelBtn' , 'btn' , 'hide')
div.append(cancelBtn)

const cancelIcon = document.createElement('i')
cancelIcon.classList.add('fa-solid' , 'fa-xmark')
cancelBtn.append(cancelIcon)

const confirmBtn = document.createElement('button')
confirmBtn.classList.add('confirmBtn' , 'btn' , 'hide')
div.append(confirmBtn)

const confirmIcon = document.createElement('i')
confirmIcon.classList.add('fa-solid' , 'fa-check')
confirmBtn.append(confirmIcon)

// -- create list item end --

}


// -- add process start --
const addBtn = document.getElementById('addBtn')
const addInput = document.getElementById('add-task-input')
const itemInputs = document.querySelectorAll('.item-input')

addBtn.addEventListener('click' , () => {
    if(addInput.value.trim() === '') {
        alert(`the input is empty`)
        return
    }
    addItemFunc(addInput.value)
    addInput.value = ''
    addInput.focus()
    editBtnFunc()
    removeBtnFunc()
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
                alert(`the input is empty`)
                return
            }

            // add hide class to confirm button
            confirmBtn.classList.replace('show' , 'hide')

            // add hide class to cancel button
            confirmBtn.previousElementSibling.classList.replace('show' , 'hide')

            // add show class to edit button
            confirmBtn.parentElement.firstElementChild.classList.replace('hide' , 'show')

            // add disabled to input item
            confirmBtn.parentElement.parentElement.firstElementChild.setAttribute('disabled' , 'disabled')
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
            removeBtn.parentElement.parentElement.remove()
        })
    })
}
// -- remove process end --
