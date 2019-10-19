import { getRecipies, updateR, getIngridients, createI } from './functions'
import { render, renderIngridients } from './rendering'

const hash = location.hash.substring(1)
const list = document.querySelector('.checkboxes')



const match = getRecipies().findIndex(cur => cur.id === hash)
const title = document.querySelector('#input-title')
const body = document.querySelector('#input-body')
const iValue = document.querySelector('#ingridients-field')
if (match === -1) {
  location.assign('index.html')
}
render(title, body, hash)
renderIngridients(list)


document.querySelector('.form-group').addEventListener('submit', (e) => {
  e.preventDefault()
  updateR(title.value.toLowerCase(), body.value, hash)
  location.assign('/index.html')


})

document.querySelector('#ingridients-field').addEventListener('input', (e) => {
  if (e.target.value.trim()) {
    e.target.nextElementSibling.style.visibility = 'visible'
  } else {
    e.target.nextElementSibling.style.visibility = 'hidden'
  }
})

document.querySelector('.ingridients.button').addEventListener('click', (e) => {
  const notUnique = getIngridients().reduce((acc, cur) => {
    return acc || cur === iValue.value || cur.ingridient === iValue.value
  }, false)
  
  if (iValue.value.trim().length > 0 && !iValue.value.trim().includes(',') && !iValue.value.includes(' ')) {
    if (!notUnique) {
      createI(iValue.value)
      
      
      iValue.value = ''

      

      renderIngridients(document.querySelector('.checkboxes'))
      e.target.style.visibility = 'hidden'
    }
  }
})

updateR(title.value, body.value, hash)


document.body.addEventListener('touchmove',() => {console.log('touchmove')})



