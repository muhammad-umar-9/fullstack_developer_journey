// Player object with properties
let player = {
    name: "Player",
    chips: 500,
    wins: 0,
    losses: 0,
    games: 0
}

// Dealer object
let dealer = {
    cards: [],
    sum: 0,
    isRevealed: false
}

// Game state variables
let playerCards = []
let playerSum = 0
let hasBlackJack = false
let isAlive = false
let gameActive = false
let currentBet = 0
let message = ""
let gameHistory = []

// DOM elements
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")
let dealerSumEl = document.getElementById("dealer-sum-el")
let betEl = document.getElementById("bet-el")
let statsEl = document.getElementById("stats-el")
let historyEl = document.getElementById("history-el")

// Initialize player display
updatePlayerDisplay()

// Function to get random card (1-13, with face cards = 10, Ace = 11)
function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

// Function to calculate sum with Ace handling
function calculateSum(cards) {
    let sum = 0
    let aces = 0
    
    // Count regular cards and aces
    for (let i = 0; i < cards.length; i++) {
        if (cards[i] === 11) {
            aces++
        }
        sum += cards[i]
    }
    
    // Convert Aces from 11 to 1 if sum > 21
    while (sum > 21 && aces > 0) {
        sum -= 10
        aces--
    }
    
    return sum
}

// Function to update player display
function updatePlayerDisplay() {
    playerEl.textContent = player.name + ": $" + player.chips
    statsEl.textContent = "Games: " + player.games + " | Wins: " + player.wins + " | Losses: " + player.losses
}

// Function to place bet
function placeBet() {
    let betAmount = parseInt(document.getElementById("bet-input").value)
    
    // Validation using comparison operators
    if (betAmount <= 0) {
        alert("Please enter a valid bet amount!")
        return false
    } else if (betAmount > player.chips) {
        alert("You don't have enough chips!")
        return false
    }
    
    currentBet = betAmount
    betEl.textContent = "Current Bet: $" + currentBet
    return true
}

// Function to start a new game
function startGame() {
    // Check if bet is placed using logical operators
    if (!placeBet() || gameActive) {
        return
    }
    
    // Deduct bet from chips
    player.chips -= currentBet
    updatePlayerDisplay()
    
    // Reset game state using assignment operators
    gameActive = true
    isAlive = true
    hasBlackJack = false
    playerCards = []
    dealer.cards = []
    dealer.isRevealed = false
    
    // Deal initial cards
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    playerCards = [firstCard, secondCard]
    playerSum = calculateSum(playerCards)
    
    // Deal dealer cards
    dealer.cards = [getRandomCard(), getRandomCard()]
    dealer.sum = calculateSum(dealer.cards)
    
    renderGame()
    
    // Check for immediate blackjack using comparison operators
    if (playerSum === 21) {
        hasBlackJack = true
        endGame()
    }
}

// Function to render the game state
function renderGame() {
    // Display player cards using for loop
    cardsEl.textContent = "Your Cards: "
    for (let i = 0; i < playerCards.length; i++) {
        cardsEl.textContent += playerCards[i] + " "
    }
    
    // Display dealer cards (hide second card if not revealed)
    dealerCardsEl.textContent = "Dealer Cards: " + dealer.cards[0]
    if (dealer.isRevealed) {
        // Use for loop to show all dealer cards
        dealerCardsEl.textContent = "Dealer Cards: "
        for (let i = 0; i < dealer.cards.length; i++) {
            dealerCardsEl.textContent += dealer.cards[i] + " "
        }
        dealerSumEl.textContent = "Dealer Sum: " + dealer.sum
    } else {
        dealerCardsEl.textContent += " [Hidden]"
        dealerSumEl.textContent = "Dealer Sum: " + dealer.cards[0] + " + ?"
    }
    
    sumEl.textContent = "Your Sum: " + playerSum
    
    // Game logic using if-else statements and comparison operators
    if (playerSum < 21 && gameActive) {
        message = "Do you want to hit or stand?"
    } else if (playerSum === 21 && !hasBlackJack) {
        message = "Perfect 21! Standing automatically..."
        stand()
    } else if (playerSum === 21 && hasBlackJack) {
        message = "Blackjack! Checking dealer..."
        endGame()
    } else if (playerSum > 21) {
        message = "Bust! You went over 21!"
        isAlive = false
        endGame()
    }
    
    messageEl.textContent = message
}


// Function to hit (draw new card)
function newCard() {
    // Use logical operators to check game state
    if (isAlive === true && hasBlackJack === false && gameActive === true) {
        let card = getRandomCard()
        playerSum += card
        playerCards.push(card)
        playerSum = calculateSum(playerCards) // Recalculate with Ace handling
        renderGame()        
    }
}

// Function to stand (end player turn)
function stand() {
    if (!gameActive) return
    
    dealer.isRevealed = true
    
    // Dealer draws cards using while loop and comparison operators
    while (dealer.sum < 17) {
        let newCard = getRandomCard()
        dealer.cards.push(newCard)
        dealer.sum = calculateSum(dealer.cards)
    }
    
    endGame()
}

// Function to end game and determine winner
function endGame() {
    gameActive = false
    dealer.isRevealed = true
    dealer.sum = calculateSum(dealer.cards)
    
    let result = ""
    let won = false
    
    // Complex conditional logic using logical operators
    if (playerSum > 21) {
        result = "You bust! Dealer wins!"
        won = false
    } else if (dealer.sum > 21) {
        result = "Dealer busts! You win!"
        won = true
    } else if (hasBlackJack && dealer.sum !== 21) {
        result = "Blackjack! You win!"
        won = true
    } else if (!hasBlackJack && dealer.sum === 21 && dealer.cards.length === 2) {
        result = "Dealer has Blackjack! You lose!"
        won = false
    } else if (playerSum > dealer.sum) {
        result = "You win!"
        won = true
    } else if (playerSum < dealer.sum) {
        result = "Dealer wins!"
        won = false
    } else {
        result = "It's a tie!"
        // Return bet on tie
        player.chips += currentBet
        updatePlayerDisplay()
        renderGame()
        message = result
        messageEl.textContent = message
        addToHistory(result)
        return
    }
    
    // Update chips and stats using arithmetic operators
    if (won) {
        player.chips += currentBet * 2 // Win double
        player.wins++
    } else {
        // Bet already deducted, just update losses
        player.losses++
    }
    
    player.games++
    updatePlayerDisplay()
    renderGame()
    message = result
    messageEl.textContent = message
    addToHistory(result)
}

// Function to add game result to history array
function addToHistory(result) {
    let gameResult = {
        game: player.games,
        result: result,
        bet: currentBet,
        playerSum: playerSum,
        dealerSum: dealer.sum
    }
    
    gameHistory.push(gameResult)
    
    // Display last 5 games using array manipulation
    let recentGames = gameHistory.slice(-5)
    historyEl.innerHTML = "<h3>Recent Games:</h3>"
    
    for (let i = 0; i < recentGames.length; i++) {
        historyEl.innerHTML += `Game ${recentGames[i].game}: ${recentGames[i].result} (Bet: $${recentGames[i].bet})<br>`
    }
}

// Function to reset game
function resetGame() {
    // Reset using assignment operators and object properties
    player.chips = 500
    player.wins = 0
    player.losses = 0
    player.games = 0
    gameHistory = []
    currentBet = 0
    gameActive = false
    
    // Clear displays
    messageEl.textContent = "Game reset! Want to play?"
    cardsEl.textContent = "Your Cards: "
    sumEl.textContent = "Your Sum: "
    dealerCardsEl.textContent = "Dealer Cards: "
    dealerSumEl.textContent = "Dealer Sum: "
    betEl.textContent = "Current Bet: $0"
    historyEl.innerHTML = ""
    
    updatePlayerDisplay()
}
