const body = document.body
const counter = document.querySelector("#counter")
const form = document.querySelector("#comment-form")
const pauseButton = document.getElementById('pause')
const plusButton = document.getElementById('plus')
const minusButton = document.getElementById('minus')
const heartButton = document.getElementById('heart')
const submitButton = document.getElementById('submit')
let paused = false;
let intervalID = window.setInterval(updateCounter, 1000); 

function updateCounter() {
    counter.innerText = parseInt(counter.innerText,10) + 1
}

function add_comment(e) {
    e.preventDefault();
    const commentList = document.querySelector("#list")
    const commentInput = document.querySelector("#comment-input")
    const comment = document.createElement("p")
    comment.innerText = commentInput.value
    commentList.append(comment)
    commentInput.value = ""
}


function fave_number(e) {
    e.preventDefault();
    const ulLikes = document.querySelector("ul")
    let currentNum = counter.innerText
    let faved = false
    liExists = Array.from(ulLikes.children)
    liExists.forEach(obj => { 
        if (obj.dataset.number === currentNum) {
            let newNum = parseInt(obj.children[0].innerText,10) + 1
            obj.innerHTML = currentNum + " has been liked <span>" + newNum + "</span> times"
            faved = true
        } 
    })
    if (faved === false) {
        const liLikes = document.createElement("li")
        liLikes.dataset.number = currentNum
        liLikes.innerHTML = currentNum + " has been liked <span>1</span> time"
        ulLikes.append(liLikes)
    }
}

document.getElementById('minus').onclick = function() { 
    counter.innerText = parseInt(counter.innerText,10) - 1
}

pauseButton.onclick = function() { 
    if (paused) {
        intervalID = window.setInterval(updateCounter, 1000);
        pauseButton.innerText = "pause"
        plusButton.disabled = false
        minusButton.disabled = false
        heartButton.disabled = false
        submitButton.disabled = false
    } else {
        window.clearInterval(intervalID)
        pauseButton.innerText = "resume"
        plusButton.disabled = true
        minusButton.disabled = true
        heartButton.disabled = true
        submitButton.disabled = true
    }
    paused = !paused
}

plusButton.onclick = updateCounter
heartButton.onclick = fave_number

form.addEventListener("submit", add_comment)


