'use strict'
const tasksList = document.getElementById('tasks-list')
// -- create list item start --
const li = document.createElement('li')
li.classList.add('tasks-item')

const input = document.createElement('input')
input.classList.add('item-input')
li.append(input)

const div = document.createElement('div')
div.classList.add('btn-group')
li.append(div)

const removeBtn = document.createElement('button')
removeBtn.classList.add('removeBtn' , 'btn')
div.append(removeBtn)

const editBtn = document.createElement('button')
editBtn.classList.add('editBtn' , 'btn')
div.append(editBtn)

const editIcon = document.createElement('i')
editIcon.classList.add('fa-solid' , 'fa-pen-to-square')
editBtn.append(editIcon)

const removeIcon = document.createElement('i')
removeIcon.classList.add('fa-solid' , 'fa-trash')
removeBtn.append(removeIcon)
// -- create list item end --
