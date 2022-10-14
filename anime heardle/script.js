const firstPage = document.getElementById('page-1')
const secondPage = document.getElementById('page-2')
const informationBtn = document.getElementById('information')
const aboutBtn = document.getElementById('about')
const overlay = document.getElementById('overlay')
const helpPage = document.getElementById('help-page')
const guessList = document.getElementById('glist').getElementsByTagName("li")
const loadingBar = document.getElementsByClassName('loading-bar')[0]
const currTime = document.querySelector('.curr-time')
const maxTime = document.querySelector('.max-time')
const playBtn = document.querySelector('.play')
const fa = playBtn.querySelector('.fa-play')
const searchbar = document.querySelector('.search-bar')
const skipBtn = document.querySelector('.skip')
const submitBtn = document.querySelector('.submit')
const nextBtn = document.querySelector('.next-song')


const skip = 'SKIPPED'
//max time that can be currently played
let totalTime = 1
// seconds added from skip
let addedTime = 1
let currLoadLine = 'loadline' + (addedTime) + '.style.left'

let isPlaying = false
let startTime
// loadingbar width per interval tick
let timeInterval = 1/totalTime


const songList = ['Yoiyoi kokon', 'Koi wazurai', 'Odo', 'Yume tarou']
let songIndex = 0

const game = {currTime: null}

let help = true

let score = 0

aboutBtn.addEventListener(('click'), () => {
    if (help == true) {
        help = false
        overlay.style.display = 'block'
        helpPage.style.display = 'block'
        helpPage.innerHTML = 'About' + '</br>' + '</br>' + 'Based off the game Heardle, the song order chosen for the quiz is static and picked from the songs folder.' + "</br>" + "</br>" + 'Will be updated.'
    }
    else {
        helpOff()
    }
})

informationBtn.addEventListener(('click'), () => {
    if (help == true) {
        help = false
        overlay.style.display = 'block'
        helpPage.style.display = 'block'
        helpPage.innerHTML = 'How to play' + '</br>' + '</br>' + 'Listen to the intro, then find the correct artist & title in the list.' + "</br>" + "</br>" + 'Skipped or incorrect attempts unlock more of the intro.'
    }
    else {
        helpOff()
    }
})

// turn off help page container
function helpOff() {
    help = true
    overlay.style.display = 'none'
    helpPage.style.display = 'none'
}

playBtn.addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true
        document.getElementById(songList[songIndex]).play()
        fa.classList.replace("fa-play", "fa-pause")
        const date = new Date()
        startTime = date.getTime()
        counting()
    }
    else {
        end()
    }
})

// counts time elapsed
function counting() {
    let sec, milli
    game.currTime = setInterval(() => {
        const diff = new Date().getTime() - startTime
        sec = parseInt(diff/1000)
        sec = sec < 10 ? '0:0' + sec : '0:' + sec
        const loadingWidth = parseFloat(getComputedStyle(loadingBar).getPropertyValue('--width')) || 0
        loadingBar.style.setProperty('--width', loadingWidth + timeInterval)
        currTime.textContent = sec
        if (diff >  totalTime * 1000)
        {
            end()
        }
    }  ,10)
}

// resets sound and labels
function end() {
    isPlaying = false
    fa.classList.replace("fa-pause", "fa-play")
    clearInterval(game.currTime)

    const song = document.getElementById(songList[songIndex])
    song.pause()
    song.currentTime = 0

    loadingBar.style.setProperty('--width', 0)
    currTime.textContent = '0:00'
}

skipBtn.addEventListener('click', () => {
        guessList[addedTime - 1].innerHTML = skip
        nextGuess()
});

function nextGuess() {
    totalTime += addedTime
    timeInterval = 1/totalTime
    addedTime++
    if (addedTime > 6) {
        correctAnswer()
    }
    // last skip
    else if (addedTime === 6) {
        skipBtn.innerHTML = `SKIP`
        // goes to the next load bar line
        currLoadLine = `loadline${addedTime}.style.left`
        loadingBar.style.width = eval(currLoadLine)
    }
    else {
        skipBtn.innerHTML = `SKIP (+${addedTime}s)`
        currLoadLine = `loadline${addedTime}.style.left`
        loadingBar.style.width = eval(currLoadLine)
    }
    if (isPlaying === true) {
        const loadingWidth = parseFloat(getComputedStyle(loadingBar).getPropertyValue('--width')) || 0
        loadingBar.style.setProperty('--width', loadingWidth + timeInterval)
    }
}

function correctAnswer () {
    firstPage.style.display = 'none'
    secondPage.style.display = 'flex'
    document.getElementsByClassName('correct-song')[0].innerHTML = 'Song: </br>' + songList[songIndex]
    if (isPlaying) {
        isPlaying = false
        end()
    }
    if (songIndex === songList.length - 1) {
        nextBtn.innerHTML = 'Results'
    }
}

submitBtn.addEventListener('click', () => {
    if (searchbar.value !== '') {
        if (searchbar.value.toLowerCase() === songList[songIndex].toLowerCase()) {
            correctAnswer()
            score++
        }
        else if (addedTime > 6){
            correctAnswer()
        }
        else {
            guessList[addedTime - 1].innerHTML = searchbar.value
            nextGuess()
            searchbar.value = ''
        }
    }
})

nextBtn.addEventListener('click', () => {
    if (songIndex < songList.length - 1) {
        songIndex++
        reset()
        firstPage.style.display = 'block'
        secondPage.style.display = 'none'
    }
    else {
        document.getElementsByClassName('correct-song')[0].innerHTML = `You guessed ${score} / ${songIndex} correctly </br> </br> Thanks for playing!!!`
        nextBtn.style.display = 'none'
    }
})

function reset() {
    totalTime = 1
    addedTime = 1
    let currLoadLine = 'loadline' + (addedTime) + '.style.left'
    let isPlaying = false
    let timeInterval = 1/totalTime
    const game = {currTime: null}
    loadingBar.style.width = '6.25%'
    for (let i = 0; i < guessList.length; i++)
    {
        guessList[i].innerHTML = ''
    }
    searchbar.value = ''
}
