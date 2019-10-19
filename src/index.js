import { getRecipies, createR, toStorage, sortAlpha, sortDate } from './functions'
import { populateIndex, filterRender } from './rendering';





document.querySelector('#filter').addEventListener('input', (e) => {
  let filter = getRecipies().filter(cur => cur.title.toLowerCase().includes(e.target.value.toLowerCase()))
  filterRender(document.querySelector('.recipie-container'), filter)


})

document.querySelector('#radioBtn').addEventListener('change', (e) => {
  if (e.target.value) {
    sortAlpha(document.querySelector('.recipie-container'))
  }
})

document.querySelector('#radioBtn2').addEventListener('change', (e) => {
  if (e.target.value) {
    sortDate(document.querySelector('.recipie-container'))
  }
})

getRecipies().forEach((cur, index) => {
  if (cur.title.length < 1 && cur.body.length < 1) {
    getRecipies().splice(index, 1)
    toStorage()
  }
})

populateIndex(document.querySelector('.recipie-container'))

document.querySelector('.button').addEventListener('click', (e) => {


  location.assign(`edit.html#${createR()}`)
})




