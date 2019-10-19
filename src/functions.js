import uuidv4 from 'uuid/v4'
import moment from 'moment'
import { filterRender, populateIndex } from './rendering'












let recipies = []
let ingridients = []




function filterRecipies(change) {
  recipies = change
}

function testIngridients() {
  let search = JSON.parse(localStorage.getItem('recipies'))

  if (search !== null) {
    if (search.find(cur => cur.id === location.hash.substring(1)) !== undefined) {
      ingridients = search.find(cur => cur.id === location.hash.substring(1)).ingridients
    }
  } else {
    ingridients = []
  }
}

testIngridients()

function loadRecipies() {
  localStorage.getItem('recipies') !== null ? recipies = JSON.parse(localStorage.getItem('recipies')) :
    recipies = []
}

// const fixMe = () => {
//   ingridients = JSON.parse(localStorage.getItem('recipies'))
// }
// fixMe()

loadRecipies()

const getRecipies = () => recipies


function createR() {
  const id = uuidv4()
  let recipie = {
    id: id,
    title: '',
    body: '',
    createdAt: moment().valueOf(),
    ingridients: getIngridients()
  }
  getRecipies().push(recipie)
  toStorage()
  return id
}

const toStorage = function () {
  localStorage.setItem('recipies', JSON.stringify(getRecipies()))
}

const getIngridients = () => ingridients

function createI(el) {
  let ingridient = {
    ingridient: el,
    have: false
  }

  ingridients.push(ingridient)

  toStorage()
  // updateR('Hardcoded', 'Forced', 'c72f2874-d86b-48c3-a3f3-3c23e2ad9578')
}

const updateR = (title, body, hash) => {

  //  let currentlyUpdated =  getRecipies().find( cur => cur.id = hash)
  getRecipies().forEach(cur => {
    if (cur.id === hash) {
      cur.title = title
      cur.body = body
      cur.ingridients = getIngridients()
      toStorage()

    }
  })




}

const removeR = (id, dom) => {
  getRecipies().forEach((cur, index) => {
    if (id === cur.id) {
      let removed = getRecipies().splice(index, 1)

      let regret = document.createElement('a')
      regret.textContent = 'Regret'
      regret.className = '_removed'
      regret.style.display = 'flex'


      regret.addEventListener('click', () => {

        removed = removed.find(cur => cur.id === id)
        getRecipies().splice(index, 0, removed)
        toStorage()
        regret.textContent = 'Restoring...'
        regret.className = 'restored'
        console.log(getRecipies())
        setTimeout(() => {
          populateIndex(document.querySelector('.recipie-container'))

        }, 500)
      })
      dom.insertBefore(regret, dom.firstElementChild)
      setTimeout(() => {
        if (dom.firstElementChild.classList.contains('restored') || dom.firstElementChild.classList.contains('_removed')) {
          dom.firstElementChild.remove()
        }
      }, 3000)
    } toStorage()
  })
}

const toggle = function (cur) {
  cur.have = !cur.have
}


const sortAlpha = (dom) => {
  let sorted = getRecipies().sort((a, b) => {
    return a.title > b.title ? 1 : -1
  })
  filterRender(dom, [...sorted])

  
}

const sortDate = (dom) => {
  let sorted = getRecipies().sort((a, b) => {
    return a.createdAt > b.createdAt ? 1 : -1
  })
  filterRender(dom, [...sorted])

  
}


export { sortDate, sortAlpha, toggle, getRecipies, createR, getIngridients, createI, updateR, removeR, toStorage, filterRecipies }