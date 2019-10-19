import { getRecipies, removeR, getIngridients, toggle, toStorage} from './functions'




const render = function (el1, el2, hash) {
  const item = getRecipies().find(cur => cur.id === hash)
  el1.value = item.title
  el2.value = item.body
  

  
}


const populateIndex = function (dom) {
  const big = function (string) {
    const char = string.charAt(0).toUpperCase()
    return char + string.slice(1).toLowerCase()
  }
  dom.innerHTML = ''
  getRecipies().forEach(cur => {
    if (cur.title.length > 0 || cur.body.length > 0) {
      let summary = ''
      let someI = 'Currently lack '
      let haveAll = cur.ingridients.every(cur => cur.have === true) && cur.ingridients.length > 0
      let haveNone = cur.ingridients.every(cur => cur.have === false) && cur.ingridients.length > 0
      let nonAdded = cur.ingridients.length < 1
      let missing = cur.ingridients.filter(cur => cur.have === false)
      if(missing !== undefined) {
        if(missing.length === 0) {
          someI = ''
        }
        
        
        missing.forEach((cur,index) => {
          if(index < missing.length -1 ) {
            if (index === missing.length - 2) {
              someI += cur.ingridient + ' and '
            } else {

              someI += cur.ingridient + ', '
            }
          } else {
            someI += cur.ingridient
          }
          
        })
      }
      

      if(haveAll) {
        summary = 'Good to go! You have all the ingridients'
        
        
      } else if (haveNone) {
        summary = 'You currently have none of the ingridients'
        
      } else if (nonAdded) {
        summary = `Please add some ingridients. No ingridients currently listed`
      }
      
      else  {
        summary = 'You currently have some of the ingridients'
        
        
        
      }
      

      let a = document.createElement('a')
      
      
      a.href = `/edit.html#${cur.id}`
      a.innerHTML = `
      <div class="reci-viewport" >
      <h3 style="display: flex;">${big(cur.title)}</h3>
      <a href="#" style="display: none; text-decoration:none; color:white" id="x-btn" class="remove">Remove</a>
      <br>
      </div>
      <div><p style="font-size:20px; display:block">${summary}</p></div>
      <p style="font-size:20px; margin-top:5px; font-weight:900" id="conditional">${someI}</p>
      `
      let remove = document.createElement('a')
      remove.className = 'remove'
      remove.href = '#'
      remove.style.display = "inline"
      remove.style.textDecoration = "none"
      remove.style.color = "#673AB7"
      remove.textContent = "X"
      remove.style.fontWeight = 900;
      remove.addEventListener('click', function (e) {
        const keyId = e.target.parentElement.parentElement.hash.substring(1)
        removeR(keyId, dom)

        e.target.parentElement.parentElement.remove()
        
      })

      a.firstElementChild.appendChild(remove)
      a.style.padding = "20px"
      a.firstElementChild.style.display = "flex"
      a.firstElementChild.style.justifyContent = "space-between"
      a.style.textDecoration = "none"
      a.style.color = "white"
      a.style.borderRadius = "15px"
      a.style.backgroundColor = "white"


      a.style.backgroundColor = ""
      
      dom.appendChild(a)

      
        
      
    }
  })
}




const renderIngridients = function(dom) {
  dom.innerHTML = ''
  getIngridients().forEach((cur,index) => {
    
    let main = document.createElement('div')
    let p = document.createElement('p')
    let cbx = document.createElement('input')
    let del = document.createElement('a')
    let span1 = document.createElement('span')
    let span2 = document.createElement('span')
    let span3 = document.createElement('span')
    
    main.style.display = 'flex'
    main.style.justifyContent ='space-evenly'

    del.href = "#"
    del.textContent = 'X'
    del.style.textDecoration = 'none'
    del.style.color = 'rgb(34, 175, 194)'
    del.addEventListener('click', (e)=> {
      e.preventDefault()

      getIngridients().splice(index,1)
      toStorage()
      renderIngridients(document.querySelector('.checkboxes'))

    })
      

    span3.style.width = "25%"

    
    p.textContent = cur.ingridient
    p.style.fontSize = "35px"
    
    span1.style.width = "25%"
    span1.classList.add('spncheck')
    
    
    
    cbx.setAttribute('type', 'checkbox')
    cbx.className = `cbx${index}`
    cbx.classList.add('csscbx')
    cbx.addEventListener('change', function(e) {
      if(e.target.checked ) {
        cur.have = true
      } else {
        cur.have = false
      }
      toStorage()
      
      
    })
    if(cur.have === true) {

      cbx.checked = true
    } else {
      cbx.checked = false
    }
    



    main.appendChild(span1)
    span1.appendChild(cbx)
    span1.appendChild(p)
    // main.appendChild(span2)
    main.appendChild(span3)
    span3.appendChild(del)

    dom.appendChild(main)
    

  })
}




const filterRender = function (dom, array) {
  const big = function (string) {
    const char = string.charAt(0).toUpperCase()
    return char + string.slice(1).toLowerCase()
  }
  dom.innerHTML = ''
  array.forEach(cur => {
    if (cur.title.length > 0 || cur.body.length > 0) {
      let summary = ''
      let someI = 'Currently lack '
      let haveAll = cur.ingridients.every(cur => cur.have === true) && cur.ingridients.length > 0
      let haveNone = cur.ingridients.every(cur => cur.have === false) && cur.ingridients.length > 0
      let nonAdded = cur.ingridients.length < 1
      let missing = cur.ingridients.filter(cur => cur.have === false)
     
      if(missing !== undefined) {
        if(missing.length === 0) {
          someI = ''
        }
        
        
        missing.forEach((cur,index) => {
          if(index < missing.length -1 ) {
            if (index === missing.length - 2) {
              someI += cur.ingridient + ' and '
            } else {

              someI += cur.ingridient + ', '
            }
          } else {
            someI += cur.ingridient
          }
          
        })
      }
      

      if(haveAll) {
        summary = 'Good to go! You have all the ingridients'
        
        
      } else if (haveNone) {
        summary = 'You currently have none of the ingridients'
        
      } else if (nonAdded) {
        summary = `Please add some ingridients. No ingridients currently listed`
      }
      
      else  {
        summary = 'You currently have some of the ingridients'
        
        
        
      }
      

      let a = document.createElement('a')
      
      
      a.href = `/edit.html#${cur.id}`
      a.innerHTML = `
      <div class="reci-viewport" >
      <h3 style="display: flex;">${big(cur.title)}</h3>
      <a href="#" style="display: none; text-decoration:none; color:white" class="remove">Remove</a>
      <br>
      </div>
      <div><p style="font-size:20px; display:block">${summary}</p></div>
      <p style="font-size:20px; margin-top:5px; font-weight:900" id="conditional">${someI}</p>
      `
      let remove = document.createElement('a')
      remove.className = 'remove'
      remove.href = '#'
      remove.style.display = "inline"
      remove.style.textDecoration = "none"
      remove.style.color = "#673AB7"
      remove.textContent = "X"
      remove.style.fontWeight = 900;
      remove.addEventListener('click', function (e) {
        const keyId = e.target.parentElement.parentElement.hash.substring(1)
        removeR(keyId, dom)
        
        e.target.parentElement.parentElement.remove()
        
      })

      a.firstElementChild.appendChild(remove)
      a.style.padding = "20px"
      a.firstElementChild.style.display = "flex"
      a.firstElementChild.style.justifyContent = "space-between"
      a.style.textDecoration = "none"
      a.style.color = "white"
      a.style.borderRadius = "15px"
      a.style.backgroundColor = "white"


      a.style.backgroundColor = ""
      
      dom.appendChild(a)

      
        
      
    }
  })
}
















export { render, populateIndex, renderIngridients, filterRender }