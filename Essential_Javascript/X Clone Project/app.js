import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')
const charCount = document.getElementById('char-count')

// Load data from localStorage or use default data
let tweets = JSON.parse(localStorage.getItem('tweetsData')) || tweetsData

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem('tweetsData', JSON.stringify(tweets))
}

// Character counter and button state
tweetInput.addEventListener('input', function() {
    const remainingChars = 280 - tweetInput.value.length
    charCount.textContent = remainingChars
    
    if (remainingChars < 20) {
        charCount.style.color = '#e0245e'
    } else if (remainingChars < 50) {
        charCount.style.color = '#ffad1f'
    } else {
        charCount.style.color = '#657786'
    }
    
    tweetBtn.disabled = tweetInput.value.trim().length === 0 || remainingChars < 0
})

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
       handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.dataset.delete){
        handleDeleteClick(e.target.dataset.delete)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if(e.target.classList.contains('reply-btn')){
        handleReplySubmit(e.target.dataset.tweetId)
    }
    else if(e.target.classList.contains('cancel-reply')){
        handleCancelReply(e.target.dataset.tweetId)
    }
})
 
function handleLikeClick(tweetId){ 
    const targetTweetObj = tweets.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
    }
    else{
        targetTweetObj.likes++ 
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    saveToLocalStorage()
    render()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweets.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    saveToLocalStorage()
    render() 
}

function handleReplyClick(replyId){
    // Hide all other reply forms first
    document.querySelectorAll('.reply-form').forEach(form => {
        form.style.display = 'none'
    })
    
    // Toggle the specific reply section
    const repliesSection = document.getElementById(`replies-${replyId}`)
    const replyForm = document.getElementById(`reply-form-${replyId}`)
    
    repliesSection.classList.toggle('hidden')
    
    if (!repliesSection.classList.contains('hidden')) {
        replyForm.style.display = 'block'
        document.getElementById(`reply-input-${replyId}`).focus()
    }
}

function handleDeleteClick(tweetId) {
    if (confirm('Are you sure you want to delete this tweet?')) {
        tweets = tweets.filter(tweet => tweet.uuid !== tweetId)
        saveToLocalStorage()
        render()
    }
}

function handleReplySubmit(tweetId) {
    const replyInput = document.getElementById(`reply-input-${tweetId}`)
    const replyText = replyInput.value.trim()
    
    if (replyText) {
        const targetTweet = tweets.find(tweet => tweet.uuid === tweetId)
        const newReply = {
            handle: '@Scrimba',
            profilePic: 'images/scrimbalogo.png',
            tweetText: replyText,
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
        
        targetTweet.replies.push(newReply)
        replyInput.value = ''
        document.getElementById(`reply-form-${tweetId}`).style.display = 'none'
        saveToLocalStorage()
        render()
    }
}

function handleCancelReply(tweetId) {
    document.getElementById(`reply-input-${tweetId}`).value = ''
    document.getElementById(`reply-form-${tweetId}`).style.display = 'none'
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')
    const tweetText = tweetInput.value.trim()

    if(tweetText && tweetText.length <= 280){
        const now = new Date()
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        
        tweets.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetText,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
            timestamp: timeString,
            canDelete: true // Mark user's own tweets as deletable
        })
    saveToLocalStorage()
    render()
    tweetInput.value = ''
    
    // Reset character counter and button state
    document.getElementById('char-count').textContent = '280'
    document.getElementById('char-count').style.color = '#657786'
    document.getElementById('tweet-btn').disabled = true
    }
}

function getFeedHtml(){
    let feedHtml = ``
    
    tweets.forEach(function(tweet){
        
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }
        
        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}${reply.timestamp ? ` · ${reply.timestamp}` : ''}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
`
            })
        }
        
        // Reply form HTML
        const replyFormHtml = `
            <div class="reply-form" id="reply-form-${tweet.uuid}" style="display: none;">
                <div class="reply-input-area">
                    <img src="images/scrimbalogo.png" class="profile-pic">
                    <div class="reply-input-container">
                        <textarea placeholder="Tweet your reply..." id="reply-input-${tweet.uuid}" maxlength="280"></textarea>
                        <div class="reply-buttons">
                            <button class="cancel-reply" data-tweet-id="${tweet.uuid}">Cancel</button>
                            <button class="reply-btn" data-tweet-id="${tweet.uuid}">Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        
        // Delete button (only for user's own tweets)
        const deleteButton = tweet.canDelete ? 
            `<span class="tweet-detail delete-btn">
                <i class="fa-solid fa-trash" data-delete="${tweet.uuid}" aria-label="Delete tweet"></i>
            </span>` : ''
          
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div class="tweet-content">
            <div class="tweet-header">
                <p class="handle">${tweet.handle}${tweet.timestamp ? ` · ${tweet.timestamp}` : ''}</p>
                ${deleteButton}
            </div>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    aria-label="Reply to tweet"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    aria-label="Like tweet"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    aria-label="Retweet"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${replyFormHtml}
        ${repliesHtml}
    </div>   
</div>
`
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
    updateStats()
}

function updateStats() {
    const totalTweets = tweets.length
    const totalLikes = tweets.reduce((sum, tweet) => sum + tweet.likes, 0)
    const totalRetweets = tweets.reduce((sum, tweet) => sum + tweet.retweets, 0)
    
    document.getElementById('total-tweets').textContent = totalTweets
    document.getElementById('total-likes').textContent = totalLikes
    document.getElementById('total-retweets').textContent = totalRetweets
}

render()

