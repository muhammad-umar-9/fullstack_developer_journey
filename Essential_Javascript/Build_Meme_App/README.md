
#  Pumpkin's Purrfect Meme Picker

A fun and interactive web application that helps you find the perfect cat meme based on your current emotion! This project showcases essential JavaScript concepts and DOM manipulation techniques.

## 📸 Project Overview

The Meme Picker allows users to:
- Select their current emotion from dynamically generated radio buttons
- Filter results to show only animated GIFs
- View random cat images/GIFs that match their selected emotion
- Close the modal to select a different emotion

##  Learning Journey & Key Concepts

This project was built to demonstrate and practice several fundamental JavaScript concepts:

### 1. **ES6 Modules - Import/Export** 
**What I learned:** How to organize code by separating data from logic to keep the main file clean and maintainable.

**Implementation:**
- **Export:** Used `export const catsData = [...]` in `data.js` to make the cat data available to other files
- **Import:** Used `import { catsData } from '/data.js'` in `index.js` to access the data
- **Benefits:** Reduced code complexity, improved organization, and enhanced reusability

```javascript
// data.js
export const catsData = [
    {
        emotionTags: ["moody"],
        isGif: false,
        image: "angry.jpeg",
        alt: "A cat looking moody",
    },
    // ... more data
]

// index.js
import { catsData } from '/data.js'
```

### 2. **Radio Inputs & Dynamic Rendering** 📻
**What I learned:** How to dynamically create form elements and handle user selections.

**Implementation:**
- Generated radio buttons dynamically from the available emotions in the dataset
- Used `renderEmotionsRadios()` function to create HTML strings
- Learned about the `name` attribute to group radio buttons together

```javascript
function renderEmotionsRadios(cats){
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" id="${emotion}" value="${emotion}" name="emotions">
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}
```

### 3. **Event Handling & event.target.id** 
**What I learned:** How to identify which specific element triggered an event and access its properties.

**Implementation:**
- Used `event.target.id` to identify which radio button was clicked
- Added event listeners for change, click events
- Learned about event delegation and event objects

```javascript
function highlightCheckedOption(e){
    // e.target.id gives us the ID of the clicked radio button
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}
```

### 4. **DOM Navigation - parentElement** 
**What I learned:** How to navigate the DOM tree to access related elements.

**Implementation:**
- Used `parentElement` to go from the radio input to its containing div
- This allowed me to style the entire radio option container when selected
- Learned about DOM hierarchy and element relationships

```javascript
// Navigate from input element to its parent div
document.getElementById(e.target.id).parentElement.classList.add('highlight')
```

### 5. **CSS Class Manipulation - classList** 
**What I learned:** How to dynamically add and remove CSS classes to change element appearance.

**Implementation:**
- **`classList.add()`**: Added 'highlight' class to show selected option
- **`classList.remove()`**: Removed 'highlight' class from previously selected options
- Learned about the classList API and its methods

```javascript
// Remove highlight from all options
radio.classList.remove('highlight')
// Add highlight to selected option
document.getElementById(e.target.id).parentElement.classList.add('highlight')
```

### 6. **getElementsByClassName** 
**What I learned:** How to select multiple elements with the same class name and iterate through them.

**Implementation:**
- Used `getElementsByClassName('radio')` to get all radio option containers
- Learned that this returns an HTMLCollection (array-like object)
- Used for...of loop to iterate through the collection

```javascript
const radios = document.getElementsByClassName('radio')
for (let radio of radios){
    radio.classList.remove('highlight')
}
```

### 7. **Modern DOM Selection - querySelector** 
**What I learned:** How to use CSS selector syntax to find elements in the DOM.

**Implementation:**
- Used `querySelector('input[type="radio"]:checked')` to find the currently selected radio button
- Learned about CSS selector syntax and pseudo-selectors
- More flexible than older methods like getElementById

```javascript
// Find the checked radio button using CSS selector syntax
const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
```

### 8. **Array Methods - includes() and filter()** 🔧
**What I learned:** How to use powerful array methods for searching and filtering data.

**Implementation:**
- **`includes()`**: Check if an emotion exists in the emotionTags array
- **`filter()`**: Create new arrays with elements that match specific criteria
- Used these methods to find cats matching the selected emotion

```javascript
// Using includes() to check if emotion exists in tags
const matchingCatsArray = catsData.filter(function(cat){
    if(isGif){
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif
    }
    else{
        return cat.emotionTags.includes(selectedEmotion)
    }            
})

// Using includes() to avoid duplicate emotions
if (!emotionsArray.includes(emotion)){
    emotionsArray.push(emotion)
}
```

---

*This project demonstrates the journey from basic DOM manipulation to more advanced JavaScript concepts, showcasing how different techniques can work together to create an engaging user experience.*
