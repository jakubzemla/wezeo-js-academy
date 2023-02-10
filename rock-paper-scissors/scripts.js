// HTML ELEMENTS
const rulesBtn = document.querySelector('.rules-btn')
const startBtn = document.querySelector('.start-btn')
const resultDiv = document.querySelector(".result")
const againBtn = document.querySelector('.again')
const nextAtt = document.querySelector('.next-attempt')
const resetBtn = document.querySelector('.reset')
const attemptsCounter = document.querySelector('.attempt-counter')
const roundCounter = document.querySelector('.round-counter')
let pcIcon = document.querySelector(".pc-icon")
let playerIcon = document.querySelector(".player-icon")
let pcPageScore = document.querySelector(".pc-score")
let playerPageScore = document.querySelector(".player-score")

// VARIABLES AND CONSTANTS
const gameOptions = ['R', 'P', 'S']
let pcScore = 0
let playerScore = 0
let pcRandomOption = null
let playerOption = null
let winner = null
let roundAttempts = 1
let gamesCount = 1
let historyOfRound = []
let gameHistory = []
let rockCount = 0
let paperCount = 0
let scissorsCount = 0  

const showRules = () => {
    rulesDiv = document.querySelector('.rules-description')
    rulesDiv.classList.toggle("hidden")
    if (!rulesDiv.classList.contains("hidden")) {
        rulesBtn.innerText = "Hide game rules"
    } else {
        rulesBtn.innerText = "Show game rules"
    }
}

const initGame = () => {
    startBtn.style.display = "none"
    againBtn.style.display = "block"
    resetBtn.style.display = "block"
    resultDiv.style.display="flex"
    if (gamesCount === 1 && roundAttempts === 1) {
        alert("Hi! The game begins!\nIn the next step, you must enter one of the options:\n'R' for rock,\n'P' for paper,\n'S' for scissors.");
        console.log("--------------------------------------------------------------------")
        console.log("The Game begins!")
    }
    console.log(`Round ${gamesCount}; Attempt number: ${roundAttempts}`)
    getPcOption()
    getPlayerOption()
    roundCounter.innerText = `Round ${gamesCount}`
    getResult()
    attemptsCounter.innerText = `Attempts: ${roundAttempts}`
    
}

const getPcOption = () => {
    let random = Math.floor(Math.random()*3)
    pcRandomOption = gameOptions[random]
    console.log(`PC Option: ${pcRandomOption}`)
}

const getPlayerOption = () => {
    playerOption = prompt("Please, select one of the options. Write\n'R' for rock,\n'P' for paper,\n'S' for scissors.\nThen press Enter on your keyboard.").toUpperCase()
    if (gameOptions.includes(playerOption)) {
        console.log(`Player Option: ${playerOption}`)
    } else {
        alert("You have to choose only from these letter: 'R','P', 'S', Let's try again.")
        return getPlayerOption()
    }
}

// Show result, update the score, set icons and
const getResult = () => {
    let resultMessage = ""
    if (pcRandomOption === playerOption) {
        resultMessage = "Draw! No one gets a point."
        winner = "no one"
        againBtn.style.display = "none"
        nextAtt.style.display = "block"
        switch (playerOption) {
            case 'R':
                playerIcon.innerHTML = '<i class="fa-solid fa-hand-back-fist player-rotate-mirror"></i>'
                pcIcon.innerHTML = '<i class="fa-solid fa-hand-back-fist pc-rotate"></i>'
                rockCount += 2
                break
            case 'P':
                playerIcon.innerHTML = '<i class="fa-solid fa-hand pc-mirror"></i>'
                pcIcon.innerHTML = '<i class="fa-solid fa-hand"></i>'
                paperCount += 2
                break
            case 'S':
                playerIcon.innerHTML = '<i class="fa-solid fa-hand-scissors"></i>'
                pcIcon.innerHTML = '<i class="fa-solid fa-hand-scissors pc-mirror"></i>'
                scissorsCount += 2
                break
        }
        playerIcon.style.color = "white"
        pcIcon.style.color = "white"
        alert(resultMessage)
        roundHistory()
        return
    } 
    nextAtt.style.display = "none"
    switch (playerOption) {
        case 'R':
            playerIcon.innerHTML = '<i class="fa-solid fa-hand-back-fist player-rotate-mirror"></i>'
            rockCount++
            if (pcRandomOption === "P") {
                pcIcon.innerHTML = '<i class="fa-solid fa-hand"></i>'
                playerIcon.style.color = "red"
                pcIcon.style.color = "green"
                resultMessage = "The PC won this round!"
                winner = "pc"
                pcScore++
                paperCount++
            } else {
                pcIcon.innerHTML = '<i class="fa-solid fa-hand-scissors pc-mirror"></i>'
                playerIcon.style.color = "green"
                pcIcon.style.color = "red"
                resultMessage = "You won this round!"
                winner = "player"
                playerScore++
                scissorsCount++
            }
            break
        case 'P':
            playerIcon.innerHTML = '<i class="fa-solid fa-hand pc-mirror"></i>'
            paperCount++
            if (pcRandomOption === "S") {
                playerIcon.style.color = "red"
                pcIcon.style.color = "green"
                pcIcon.innerHTML = '<i class="fa-solid fa-hand-scissors pc-mirror"></i>'
                resultMessage = "The PC won this round!"
                winner = "pc"
                pcScore++
                scissorsCount++
            } else {
                playerIcon.style.color = "green"
                pcIcon.style.color = "red"
                pcIcon.innerHTML = '<i class="fa-solid fa-hand-back-fist pc-rotate"></i>'
                resultMessage = "You won this round!"
                winner = "player"
                playerScore++
                rockCount++
            }
            break
        case 'S':
            playerIcon.innerHTML = '<i class="fa-solid fa-hand-scissors"></i>'
            scissorsCount++
            if (pcRandomOption === "R") {
                pcIcon.innerHTML = '<i class="fa-solid fa-hand-back-fist pc-rotate"></i>'
                playerIcon.style.color = "red"
                pcIcon.style.color = "green"
                resultMessage = "The PC won this round!"
                winner = "pc"
                pcScore++
                rockCount++
            } else {
                pcIcon.innerHTML = '<i class="fa-solid fa-hand"></i>'
                playerIcon.style.color = "green"
                pcIcon.style.color = "red"
                resultMessage = "You won this round!"
                winner = "player"
                playerScore++
                paperCount++
            }
            break
    }
    alert(resultMessage)
    pcPageScore.innerText = `Score: ${pcScore}`
    playerPageScore.innerText = `Score: ${playerScore}`
    console.log(`Winner is ${winner}\nPC score: ${pcScore}\nPlayer score: ${playerScore}`)
    roundHistory()
    collectResults()
    gamesCount++
}

// GAME HISTORY
const roundHistory = () => {
    historyOfRound.push({ roundNumber: gamesCount, attemptNumber: roundAttempts, optionPc: pcRandomOption, optionPlayer: playerOption, gameWinner: winner })
}

const collectResults = () => {
    gameHistory.push(historyOfRound)
    historyOfRound = []
    let count = 1;
    console.log("Games history:")
    for (let rnd of gameHistory) {
        console.log(`Round-${count}:`)
        count++
        for (let att of rnd) {
            console.log(att)
        }
    }
    console.log(`Counts of options:\n\tRock: ${rockCount}\n\tPaper: ${paperCount}\n\tScissors: ${scissorsCount}`)
    console.log("--------------------------------------------------------------------")
}

const resetGame = () => {
    pcScore = 0
    playerScore = 0
    gamesCount = 1
    roundAttempts = 1
    gameHistory = []
    historyOfRound = []
    rockCount = 0
    paperCount = 0
    scissorsCount = 0  
    resultDiv.style.display="none"
    againBtn.style.display="none"
    resetBtn.style.display="none"
    startBtn.style.display="block"
    nextAtt.style.display="none"
}

rulesBtn.addEventListener("click", showRules)
startBtn.addEventListener("click", initGame)
againBtn.addEventListener("click", () => roundAttempts = 1)
againBtn.addEventListener("click", initGame)
resetBtn.addEventListener("click", resetGame)
nextAtt.addEventListener("click", () => roundAttempts++)
nextAtt.addEventListener("click", initGame)