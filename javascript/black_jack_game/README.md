
# 🂡 JavaScript Learning Journey: Project 2 - Blackjack Game

**Project-Based Learning** | **Counter App → Blackjack Game → Next Project**

This is my **second JavaScript project**! After building a counter app, I'm now creating a Blackjack game that teaches intermediate concepts through hands-on coding.

## 🎯 What I'm Learning

### From Project 1 (Counter App):
✅ Variables, basic functions, DOM manipulation, event handling

### New in Project 2 (Blackjack):
🆕 **Arrays** - Store multiple cards: `playerCards.push(card)`  
🆕 **Objects** - Organize data: `player = {chips: 500, wins: 0}`  
🆕 **For Loops** - Display cards: `for(let i = 0; i < cards.length; i++)`  
🆕 **Complex If-Else** - Game logic: `if/else if/else` chains  
🆕 **Comparison Operators** - `===`, `>`, `<`, `>=`, `<=`, `!==`  
🆕 **Logical Operators** - `&&` (AND), `||` (OR), `!` (NOT)  
🆕 **Math Object** - Random cards: `Math.floor(Math.random() * 13) + 1`  
🆕 **Return Statements** - Functions that give back values  
🆕 **Booleans** - Game states: `isAlive`, `hasBlackJack`, `gameActive`  

## 🎮 Game Features

- **Betting System** - Place bets, manage chip stack
- **Dealer AI** - Automated dealer following casino rules  
- **Game Statistics** - Track wins/losses
- **Smart Ace Handling** - Automatically converts 11→1 when needed
- **Input Validation** - Prevents invalid bets

## 💡 Key Code Examples

**Arrays for storing data:**
```javascript
let playerCards = []
playerCards.push(card)  // Add new card
```

**Objects for organization:**
```javascript
let player = {
    chips: 500,
    wins: 0,
    losses: 0
}
```

**For loops for repetition:**
```javascript
for (let i = 0; i < cards.length; i++) {
    display += cards[i] + " "
}
```

**Complex conditionals:**
```javascript
if (playerSum < 21 && gameActive) {
    message = "Hit or stand?"
} else if (playerSum === 21) {
    message = "Perfect 21!"
} else {
    message = "Bust!"
}
```

**Math object for randomness:**
```javascript
let randomCard = Math.floor(Math.random() * 13) + 1
```

## 🚀 How to Run

1. Open `index.html` in your browser
2. Place a bet and click "START GAME"
3. Choose "HIT" or "STAND"
4. Try to beat the dealer!

## 📁 Project Structure
```
black_jack_game/
├── index.html    # Game interface
├── index.css     # Styling  
├── index.js      # Game logic (main learning file)
└── README.md     # This documentation
```

## 🎯 Learning Outcomes

After this project, I understand:
- **Data organization** with arrays and objects
- **Game state management** with booleans
- **Complex decision making** with if-else chains
- **User input validation** with comparison operators
- **Code repetition** with loops
- **Random number generation** with Math object
- **Function communication** with return statements

## 🌐 What's Next?

**Project 3 Ideas:**
- Weather app (learn APIs)
- Quiz game (learn local storage)
- To-do list (learn DOM creation)

**New Concepts to Learn:**
- Fetching data from APIs
- Saving data locally
- Creating HTML elements with JavaScript
- Error handling with try/catch

---
**🚀 Learning by building - one project at a time!**
