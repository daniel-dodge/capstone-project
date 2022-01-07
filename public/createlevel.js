const allUls = document.querySelectorAll('ul')
let x = 0
let y = 0
allUls.forEach(ul => {
    
    ul.childNodes.forEach(li =>{
        li.addEventListener("click", ()=>{alert('trigger')})

    })
})

// allDots