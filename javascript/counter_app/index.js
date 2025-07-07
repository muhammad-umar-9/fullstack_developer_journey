// People Counter App
let count = 0
let saveEl = document.getElementById("save-el")
let countEl = document.getElementById("count-el")
let entries = []

// increment function to add the number of coming people
function increment() {
    count += 1
    countEl.textContent = count
}
// increment function to remove the number of coming people
function decrement() {
    if (count > 0) {
        count -= 1
        countEl.textContent = count
    }
}
// this function save the people
function save() {
    if (count > 0) {
        let entry = count + " people"
        entries.push(entry)
        
        // Display last 5 entries
        if (entries.length > 5) {
            entries.shift()
        }
        
        saveEl.textContent = entries.join(" | ")
        
        // Reset counter after saving
        count = 0
        countEl.textContent = count
    }
}
// it reset the total entries 
function reset() {
    count = 0
    countEl.textContent = count
    entries = []
    saveEl.textContent = "No entries yet"
}

// Welcome message
console.log("Welcome to People Counter App!")
console.log("Built with HTML, CSS, and JavaScript")
