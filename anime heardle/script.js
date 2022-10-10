const informationBtn = document.getElementById('information')
const aboutBtn = document.getElementById('about')
const guesslist = document.getElementById('glist').getElementsByTagName("li")
const loadingIndicator = document.querySelector('.loading-indicator')
const currTime = document.querySelector('.curr-time')
const playBtn = document.querySelector('.play')
const searchbar = document.querySelector('.search-bar')
const skipBtn = document.querySelector('.skip')
const submitBtn = document.querySelector('.submit')

const skip = 'SKIPPED'
let totalTime = 1
let addedTime = 1
let currLoadLine = 'loadline' + (addedTime) + '.style.left'

playBtn.addEventListener('click', () => {
    while (currTime < totalTime) {
        let count = setInterval(counting, 30)
    }
})

function counting (){
    currTime.innerHTML += 1  
    let currLoadLine = new Date()
}

skipBtn.addEventListener('click', () => {
        totalTime += addedTime
        guesslist[addedTime - 1].innerHTML = skip
        addedTime++
        if (addedTime > 6) {

        }
        else if (addedTime === 6) {
            skipBtn.innerHTML = `SKIP`
            currLoadLine = `loadline${addedTime}.style.left`
            loadingIndicator.style.width = eval(currLoadLine)
        }
        else {
            skipBtn.innerHTML = `SKIP (+${addedTime}s)`
            currLoadLine = `loadline${addedTime}.style.left`
            loadingIndicator.style.width = eval(currLoadLine)
        }
});

submitBtn.addEventListener('click', () => {
    console.log(searchbar.value)
})
// milliseconds -> truncate by 1000
