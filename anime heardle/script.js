const informationBtn = document.getElementById('information')
const aboutBtn = document.getElementById('about')
const guesslist = document.getElementById('glist').getElementsByTagName("li")
const loadingIndicator = document.querySelector('.loading-indicator')
const currTime = document.querySelector('.curr-time')
const playBtn = document.querySelector('.play')
const fa = playBtn.querySelector('.fa-play')
const searchbar = document.querySelector('.search-bar')
const skipBtn = document.querySelector('.skip')
const submitBtn = document.querySelector('.submit')

const skip = 'SKIPPED'
let totalTime = 1
let addedTime = 1
let currLoadLine = 'loadline' + (addedTime) + '.style.left'

let isPlaying = false
let startTime, stopTime

const game = {currTime: null}

playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true
        fa.classList.replace("fa-play", "fa-pause")
        const date = new Date()
        startTime = date.getTime()
        counting()
    }
    else {
        isPlaying = false
        fa.classList.replace("fa-pause", "fa-play")
        const date = new Date()
        game.end = date.getTime()
        const totalTime = ((game.start - game.end) / 1000)
        clearInterval(game.currTime)
        currTime.textContent = '0:00'
    }
})

function counting (){
    let sec, milli
    game.currTime = setInterval(() => {
        const diff = new Date().getTime() - startTime
        sec = parseInt(diff/1000)
        sec = sec < 10 ? '0:0' + sec : '0:' + sec
        console.log(diff)
        currTime.textContent = sec
    }  ,10)
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
