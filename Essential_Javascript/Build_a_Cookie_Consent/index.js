// DOM element selections
const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const consentForm = document.getElementById('consent-form')
const modalText = document.getElementById('modal-text')
const declineBtn = document.getElementById('decline-btn')
const modalChoiceBtns = document.getElementById('modal-choice-btns')

// Show modal after 1.5 seconds using setTimeout
setTimeout(function(){
    modal.style.display = 'inline'
}, 1500)

// Close modal when X button is clicked
modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none'
}) 

// Toggle button positions when hovering over decline button
declineBtn.addEventListener('mouseenter', function(){
    modalChoiceBtns.classList.toggle('modal-btns-reverse')
}) 

// Handle form submission with preventDefault
consentForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    // Extract form data using FormData and .get() method
    const consentFormData = new FormData(consentForm)
    const fullName = consentFormData.get('fullName')
    
    // Show loading screen
    modalText.innerHTML = `
    <div class="modal-inner-loading">
        <img src="images/loading.svg" class="loading">
        <p id="upload-text">Uploading your data to the dark web...</p>
    </div>` 
    
    // Update loading message after 1.5 seconds
    setTimeout(function(){
        document.getElementById('upload-text').innerText = `
        Making the sale...`
    }, 1500)
    
    // Show final message and enable close button after 3 seconds
    setTimeout(function(){
        document.getElementById('modal-inner').innerHTML = `
        <h2>Thanks <span class="modal-display-name">${fullName}</span>, you sucker! </h2>
        <p>We just sold the rights to your eternal soul.</p>
        <div class="idiot-gif">
            <img src="images/pirate.gif">
        </div>
    `
    // Enable the close button by removing disabled attribute
    modalCloseBtn.disabled = false
    }, 3000)
  
}) 
