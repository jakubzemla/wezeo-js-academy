// HTML ELEMENTS
const rulesBtn = document.querySelector('.rules-btn')
const startBtn = document.querySelector('.start-btn')
const resultDiv = document.querySelector(".result")
const againBtn = document.querySelector('.again')
const nextAtt = document.querySelector('.next-attempt')
const resetBtn = document.querySelector('.reset')
const newBtn = document.querySelector('.new-game')
const attemptsCounter = document.querySelector('.attempt-counter')
const roundCounter = document.querySelector('.round-counter')
const totalWinnerDiv = document.querySelector('.total-winner')
const totalWinnerInfo = document.querySelector(".end-info")
let pcIcon = document.querySelector(".pc-icon")
let playerIcon = document.querySelector(".player-icon")
let pcPageScore = document.querySelector(".pc-score")
let playerPageScore = document.querySelector(".player-score")

// VARIABLES
let data = {
    gameOptions : ['R', 'P', 'S'],
    playerData: {
        choice: null,
        score : 0,
        icons: {
            rock: '<i id="player-icon" class="fa-solid fa-hand-back-fist player-rotate-mirror"></i>',
            paper: '<i id="player-icon" class="fa-solid fa-hand pc-mirror"></i>',
            scissors: '<i id="player-icon" class="fa-solid fa-hand-scissors"></i>'
        }
    },
    pcData: {
        choice: null,
        score: 0,
        icons: {
            rock: '<i id="pc-icon" class="fa-solid fa-hand-back-fist pc-rotate"></i>',
            paper: '<i id="pc-icon" class="fa-solid fa-hand"></i>',
            scissors: '<i id="pc-icon" class="fa-solid fa-hand-scissors pc-mirror"></i>'
        }
    },
    winner: null,
}

let {gameOptions, playerData, pcData, winner} = data

let gamesHistory = {
    attempts: 1,
    rounds: 1,
    roundHistory: [],
    totalHistory: [],
    rockCount: 0,
    paperCount: 0,
    scissorsCount: 0
}

let {attempts, rounds, roundHistory, totalHistory, rockCount, paperCount, scissorsCount} =  gamesHistory

const showRules = () => {
    rulesDiv = document.querySelector('.rules-description')
    rulesDiv.classList.toggle("hidden")
    !rulesDiv.classList.contains("hidden") 
        ? rulesBtn.innerText = "Hide game rules"
        : rulesBtn.innerText = "Show game rules"
}

const init = () =>{
    startBtn.style.display = "none"
    againBtn.style.display = "block"
    resetBtn.style.display = "block"
    resultDiv.style.display = "flex"
    totalWinnerDiv.style.display = "none"
    if (rounds === 1 && attempts === 1) {
        alert("Hi! The game begins!\nIn the next step, you must enter one of the options:\n'R' for rock,\n'P' for paper,\n'S' for scissors.");
        console.log("--------------------------------------------------------------------")
        console.log("The Game begins!")
    }
    console.log(`Round ${rounds}; Attempt number: ${attempts}`)
    getPcChoice()
    getPlayerChoice()
    roundCounter.innerText = `Round ${rounds}`
    getResults()
    attemptsCounter.innerText = `Attempts: ${attempts}`
}

const getPcChoice = () => {
    let random = Math.floor(Math.random()*3)
    pcData.choice = gameOptions[random]
    console.log(`PC Option: ${pcData.choice}`)
}

const getPlayerChoice = () => {
    playerData.choice = prompt("Please, select one of the options. Write\n'R' for rock,\n'P' for paper,\n'S' for scissors.\nThen press Enter on your keyboard.").toUpperCase()
    if (!gameOptions.includes(playerData.choice)) {
        alert("You have to choose only from these letter: 'R','P', 'S', Let's try again.")
        return getPlayerChoice()
    }
    console.log(`Player Option: ${playerData.choice}`)
}

const renderIcons = (choice, iconFor, icon) => {
    const setIcon = (option) => {
        if (iconFor == "player") {
            icon = playerData.icons[option]
        } else {
            icon = pcData.icons[option]
        } 
    }
    if (choice === "R") {
        setIcon("rock")
        rockCount++ 
    } else if (choice === "P") {
        setIcon("paper")
        paperCount++
    } else {
        setIcon("scissors")
        scissorsCount++
    }
    return icon
}

const setColor = (isPlayerWinner) => {
    if (isPlayerWinner) {
        document.getElementById("pc-icon").classList.add("looser")
        document.getElementById("player-icon").classList.add("winner")
    } else if (playerData.choice !== pcData.choice) {
        document.getElementById("pc-icon").classList.add("winner")
        document.getElementById("player-icon").classList.add("looser")
    }
}

const getResults = () => {
    let isPlayerWinner = null
    let resultMessage = ""
    if (pcData.choice === playerData.choice) {
        resultMessage = "Draw! No one gets a point."
        winner = "no one"
        againBtn.style.display = "none"
        nextAtt.style.display = "block"
    } else {
        nextAtt.style.display = "none"
        switch(playerData.choice) {
            case "R":
                pcData.choice === "P" ? isPlayerWinner = false : isPlayerWinner = true
                break
            case "P":
                pcData.choice === "S" ? isPlayerWinner = false : isPlayerWinner = true
                break
            case "S":
                pcData.choice === "R" ? isPlayerWinner = false : isPlayerWinner = true
        }

        if (isPlayerWinner) {
            resultMessage = "You won this round!"
            winner = "player"
            playerData.score++
        } else {
            resultMessage = "The PC won this round!"
            winner = "pc"
            pcData.score++
        }
    }

    pcIcon.innerHTML = renderIcons(pcData.choice, "pc", pcIcon)
    playerIcon.innerHTML = renderIcons(playerData.choice, "player", playerIcon)
    setColor(isPlayerWinner)
    
    alert(resultMessage)
    pcPageScore.innerText = `Score: ${pcData.score}`
    playerPageScore.innerText = `Score: ${playerData.score}`
    console.log(`Winner is ${winner}\nPC score: ${pcData.score}\nPlayer score: ${playerData.score}`)
    setRoundHistory()

    if (playerData.choice !== pcData.choice) {
        setGamesHistory()
        rounds++
        isTotalWinner()
    }
}

const setRoundHistory = () => {
    roundHistory.push({ 
        roundNumber: rounds, 
        attemptNumber: attempts, 
        pcChoice: pcData.choice, 
        playerChoice: playerData.choice, 
        roundWinner: winner })
}

const setGamesHistory= () => {
    totalHistory.push(roundHistory)
    roundHistory= []
    let count = 1;
    console.log("Games history:")
    for (let round of totalHistory) {
        console.log(`Round-${count}:`)
        count++
        for (let attempt of round) {
            console.log(attempt)
        }
    }
    console.log(`Counts of options:\n\tRock: ${rockCount}\n\tPaper: ${paperCount}\n\tScissors: ${scissorsCount}`)
    console.log("--------------------------------------------------------------------")
}

const isTotalWinner = () => {
    if (pcData.score >= 5 || playerData.score >= 5) {
        const totalWinner = playerData.score > pcData.score ? "Player" : "PC"
        totalWinnerInfo.innerText = `Winner is: ${totalWinner}`
        totalWinnerDiv.style.display = "flex"
        resetAll()
    }
}

const resetAll = () => {
    pcData.score = 0
    playerData.score = 0
    attempts = 1
    rounds = 1
    roundHistory = []
    totalHistory = []
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
startBtn.addEventListener("click", init)
againBtn.addEventListener("click", () => attempts = 1)
againBtn.addEventListener("click", init)
resetBtn.addEventListener("click", resetAll)
newBtn.addEventListener("click", init)
nextAtt.addEventListener("click", () => attempts++)
nextAtt.addEventListener("click", init)