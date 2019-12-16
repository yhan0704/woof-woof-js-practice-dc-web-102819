document.addEventListener("DOMContentLoaded",function(){
    fetchDog()
    document.getElementById("good-dog-filter").addEventListener("click", filterDog)
})

function fetchDog(){
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(data => {
        data.forEach(dogArray => renderDog(dogArray))
    }) 
}

function renderDog(e){
    const container = document.getElementById("dog-bar")
    const makespan = document.createElement("span")
    makespan.innerText = e.name
    makespan.id = `dog-${e.id}`
    container.appendChild(makespan)
    makespan.addEventListener("click", dogInfo)
}

function dogInfo(e){
    const getId = e.target.id.split("-")[1]
    fetch(`http://localhost:3000/pups/${getId}`)
    .then(res => res.json())
    .then(data => showUpPage(data))  
}

function showUpPage(e){
    const container = document.getElementById("dog-info")
    const dogNameEl = document.createElement("h2")
    container.appendChild(dogNameEl)
    dogNameEl.innerText = e.name
    const dogImgEl = document.createElement("img")
    container.appendChild(dogImgEl)
    dogImgEl.src = e.image
    const makeButton = document.createElement("button")
    makeButton.id = `button-${e.id}`
    container.appendChild(makeButton)
    
    if(e.isGoodDog === "true"){
        makeButton.innerText = "good dog"
    }
    else{
        makeButton.innerText = "bad dog"
    }
    
    makeButton.addEventListener("click", getFectchForStatus)
    
}

function getFectchForStatus(e){
    let anything = "false"
    const getId = e.target.id.split("-")[1]
    if(e.target.innerText === "good dog"){
        e.target.innerText = "bad dog"
        anything
    }
    else{
        e.target.innerText = "good dog"
        anything = "true"
    }
    
    fetch(`http://localhost:3000/pups/${getId}`,{
        method: "PATCH", 
        headers: {"Content-Type": "application/json",
        Accept: "application/json" 
        },
        body: JSON.stringify({"isGoodDog": anything})
    })
}

function filterDog(e){
    if(e.target.innerText === "Filter good dogs: OFF"){
        e.target.innerText = "Filter good dogs: On"
        fetch(`http://localhost:3000/pups`)
        .then(res => res.json())
        .then(data => showFilteredGoodDog(data))  
    }
    else{
        e.target.innerText = "Filter good dogs: OFF"
        fetch(`http://localhost:3000/pups`)
        .then(res => res.json())
        .then(data => showFilteredBadDog(data))  
    }
}

function showFilteredGoodDog(e){
    
    e.forEach(x => { 
        if (x.isGoodDog === "true"){
            showUpPage(x)  
        }
    })
}

function showFilteredBadDog(e){
    e.forEach(x => { 
        if (x.isGoodDog === "false"){
            showUpPage(x)  
        }
    })
}

