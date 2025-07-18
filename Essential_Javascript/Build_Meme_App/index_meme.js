
import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderCat(){
    const catObject = getSingleCatObject()
    
    // Check if a valid cat object exists
    if (!catObject) {
        memeModalInner.innerHTML = `
            <div class="no-cats-message">
                <h3>No cats found!</h3>
                <p>Try selecting a different emotion or unchecking the GIFs only option.</p>
            </div>
        `
        memeModal.style.display = 'flex'
        return
    }
    
    memeModalInner.innerHTML =  `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        <p class="cat-emotion-tags">Emotions: ${catObject.emotionTags.join(', ')}</p>
        `
    memeModal.style.display = 'flex'
}

function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    // Check if array is empty
    if(catsArray.length === 0){
        return null
    }
    else if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }
    // Return empty array if no emotion is selected
    return []
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)

// Display collection statistics
function displayCollectionStats() {
    const totalCats = catsData.length
    const totalGifs = catsData.filter(cat => cat.isGif).length
    const totalImages = totalCats - totalGifs
    const emotions = getEmotionsArray(catsData)
    
    console.log(`🐱 Meme Collection Statistics:`)
    console.log(`Total cats: ${totalCats}`)
    console.log(`GIFs: ${totalGifs}`)
    console.log(`Static images: ${totalImages}`)
    console.log(`Available emotions: ${emotions.length} (${emotions.join(', ')})`)
}

// Show stats when page loads
displayCollectionStats()




