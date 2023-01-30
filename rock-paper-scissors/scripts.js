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
let pcRandomOption
let playerOption
let winner
let roundAttempts = 1
let gamesCount = 1
let historyOfRound = []
let gameHistory = []




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
    while (!gameOptions.includes(playerOption)) {
        alert("You have to choose only from these letter: 'R','P', 'S', Let's try again.")
        getPlayerOption()
    }
    getIcons()
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
        playerOption = ""
        return
    }
}


// Change option icons on page
const getIcons = () => {
    pcIcon = document.querySelector(".pc-icon")
    playerIcon = document.querySelector(".player-icon")
    switch (pcRandomOption) {
        case 'R':
            pcIcon.innerHTML = '<i class="fa-solid fa-hand-back-fist pc-rotate"></i>'
            break
        case 'P':
            pcIcon.innerHTML = '<i class="fa-solid fa-hand"></i>'
            break
        case 'S':
            pcIcon.innerHTML = '<i class="fa-solid fa-hand-scissors pc-mirror"></i>'
    }
    switch (playerOption) {
        case 'R':
            playerIcon.innerHTML = '<i class="fa-solid fa-hand-back-fist player-rotate-mirror"></i>'
            break
        case 'P':
            playerIcon.innerHTML = '<i class="fa-solid fa-hand pc-mirror"></i>'
            break
        case 'S':
            playerIcon.innerHTML = '<i class="fa-solid fa-hand-scissors"></i>'
    }
}


//Set color for winner and loser or if the result is draw
const getColors = () => {
    if (winner === "player") {
        pcIcon.style.color = "red"
        playerIcon.style.color = "green"
    } else if (winner === "pc") {
        pcIcon.style.color = "green"
        playerIcon.style.color = "red"
    } else {
        pcIcon.style.color = "white"
        playerIcon.style.color = "white"
    }
}


// Show result and update the score
const getResult = () => {
    let resultMessage = ""
    if (pcRandomOption === playerOption) {
        resultMessage = "Draw! No one gets a point."
        winner = "no one"
        againBtn.style.display = "none"
        nextAtt.style.display = "block"
    } else {
        nextAtt.style.display = "none"
        switch (playerOption) {
            case 'R':
                if (pcRandomOption === "P") {
                    resultMessage = "The PC won this round!"
                    winner = "pc"
                    pcScore++
                } else {
                    resultMessage = "You won this round!"
                    winner = "player"
                    playerScore++
                }
                break
            case 'P':
                if (pcRandomOption === "S") {
                    resultMessage = "The PC won this round!"
                    winner = "pc"
                    pcScore++
                } else {
                    resultMessage = "You won this round!"
                    winner = "player"
                    playerScore++
                }
                break
            case 'S':
                if (pcRandomOption === "R") {
                    resultMessage = "The PC won this round!"
                    winner = "pc"
                    pcScore++
                } else {
                    resultMessage = "You won this round!"
                    winner = "player"
                    playerScore++
                }
                break
        }
    }
    alert(resultMessage)
    pcPageScore.innerText = `Score: ${pcScore}`
    playerPageScore.innerText = `Score: ${playerScore}`
    console.log(`Winner is ${winner}`)
    console.log(`PC score: ${pcScore}`)
    console.log(`Player score: ${playerScore}`)
    getColors()
    if (playerOption !== pcRandomOption) {
        roundHistory()
        collectResults()
        gamesCount++
    } else {
        roundHistory()
    }
}


// GAME HISTORY
const roundHistory = () => {
    historyOfRound.push({ roundNumber: gamesCount, attemptNumber: roundAttempts, optionPc: pcRandomOption, optionPlayer: playerOption, gameWinner: winner })
}

const collectResults = () => {
    gameHistory.push(historyOfRound)
    historyOfRound = []
    let count = 1;
    let rockCount = 0
    let paperCount = 0
    let scissorsCount = 0  
    console.log("Games history:")
    for (let rnd of gameHistory) {
        console.log(`Round-${count}:`)
        count++
        for (let att of rnd) {
            console.log(att)
        }
    }
    
    for (let round of gameHistory) {
        for (let attempt of round) {
            switch (attempt.optionPc) {
                case "R":
                    rockCount++
                    break
                case "P":
                    paperCount++
                    break
                case "S":
                    scissorsCount++
                    break
                }
            switch (attempt.optionPlayer) {
                case "R":
                    rockCount++
                    break
                case "P":
                    paperCount++
                    break
                case "S":
                    scissorsCount++
                    break
            }
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
    resultDiv.style.display="none"
    againBtn.style.display="none"
    resetBtn.style.display="none"
    startBtn.style.display="block"
}


rulesBtn.addEventListener("click", showRules)
startBtn.addEventListener("click", initGame)
againBtn.addEventListener("click", () => roundAttempts = 1)
againBtn.addEventListener("click", initGame)
resetBtn.addEventListener("click", resetGame)
nextAtt.addEventListener("click", () => roundAttempts++)
nextAtt.addEventListener("click", initGame)

