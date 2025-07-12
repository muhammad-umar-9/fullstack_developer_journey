
# Unit Converter Project 🔄

A modern, responsive web application for converting between different units of measurement including length, volume, and weight.

## 🎯 Project Overview

This is a JavaScript learning project that demonstrates fundamental web development concepts through building a practical unit converter application. The project converts between:

- **Length**: Meters ↔ Feet
- **Volume**: Liters ↔ Gallons  
- **Weight**: Kilograms ↔ Pounds


## 📚 What I Learned

### 1. **HTML Structure & Semantics**
- Creating semantic HTML with proper element hierarchy
- Using `data-*` attributes for storing custom data
- Form elements and input validation attributes
- Proper HTML5 document structure with meta tags

```html
<button class="convert-btn" data-type="length" data-from="meters" data-to="feet">
    Meters to Feet
</button>
```

### 2. **CSS Styling & Layout**
- **CSS Grid** for responsive layout design
- **Flexbox** for centering and alignment
- **CSS Custom Properties** and modern styling techniques
- **Gradient backgrounds** and visual effects
- **Responsive design** with media queries
- **CSS animations** and transitions
- **Box-shadow** and modern UI effects

```css
.conversion-section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
}
```

### 3. **JavaScript Fundamentals**

#### **DOM Manipulation**
- Selecting elements with `getElementById()` and `querySelectorAll()`
- Adding event listeners to multiple elements
- Dynamically updating content with `innerHTML`
- CSS class manipulation with `classList`

```javascript
const convertButtons = document.querySelectorAll('.convert-btn');
resultDisplay.classList.add('error');
```

#### **Event Handling**
- Click events on buttons
- Keyboard events (Enter key support)
- Input events for real-time validation
- Event delegation and data attributes

```javascript
button.addEventListener('click', () => {
    const type = button.dataset.type;
    const fromUnit = button.dataset.from;
    const toUnit = button.dataset.to;
});
```

#### **Data Structures**
- **Objects** for organizing conversion ratios
- **Nested objects** for categorizing data
- **Arrays** (through NodeList from querySelectorAll)

```javascript
const conversions = {
    length: {
        metersToFeet: 3.281,
        feetToMeters: 1 / 3.281
    },
    // ... more conversions
};
```

#### **Functions**
- **Function declarations** and **arrow functions**
- **Parameters** and **return values**
- **Pure functions** for calculations
- **Function composition** and organization

```javascript
function convert(value, fromUnit, toUnit, type) {
    let result;
    // conversion logic
    return result;
}
```

#### **Control Flow**
- **Conditional statements** (if/else)
- **Switch statements** for multiple conditions
- **Logical operators** for validation

```javascript
switch(type) {
    case 'length':
        if (fromUnit === 'meters' && toUnit === 'feet') {
            result = value * conversions.length.metersToFeet;
        }
        break;
}
```

#### **Error Handling & Validation**
- **Input validation** with `isNaN()` and type checking
- **User feedback** for invalid inputs
- **Error states** with visual indicators

```javascript
if (isNaN(value) || value === '') {
    displayError('Please enter a valid number');
    return;
}
```

#### **String Methods & Formatting**
- **Template literals** for dynamic content
- **String interpolation** with `${}`
- **Number formatting** with `toFixed()`

```javascript
resultDisplay.innerHTML = `
    <p><strong>${inputVal} ${fromLabel}</strong></p>
    <p>=</p>
    <p><strong>${convertedValue.toFixed(3)} ${toLabel}</strong></p>
`;
```



### **Conversion Ratios Used**
- 1 meter = 3.281 feet
- 1 liter = 0.264 gallons
- 1 kilogram = 2.204 pounds

