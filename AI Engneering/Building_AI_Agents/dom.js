export function renderNewMessage(text, role) {
    const conversationContainer = document.getElementById("conversation")
    const newArticle = document.createElement("article")
    newArticle.classList.add(role === "assistant" ? "ai-message" : "user-message")
    
    const newParagraph = document.createElement("p")
    
    // Add typing animation for assistant messages
    if (role === "assistant") {
        newParagraph.innerHTML = ""
        newArticle.append(newParagraph)
        conversationContainer.append(newArticle)
        scrollToBottom()
        
        // Typing effect
        let i = 0
        const typeWriter = () => {
            if (i < text.length) {
                newParagraph.innerHTML += text.charAt(i)
                i++
                setTimeout(typeWriter, 20) // Adjust speed here
            }
        }
        typeWriter()
    } else {
        newParagraph.textContent = text
        newArticle.append(newParagraph)
        conversationContainer.append(newArticle)
        scrollToBottom()
    }
}

function scrollToBottom() {
    requestAnimationFrame(() => {
        const conversation = document.getElementById("conversation")
        conversation.scrollTop = conversation.scrollHeight
    });
}

// Add a function to show loading indicator
export function showLoadingIndicator() {
    const conversationContainer = document.getElementById("conversation")
    const loadingArticle = document.createElement("article")
    loadingArticle.classList.add("ai-message", "loading")
    loadingArticle.id = "loading-indicator"
    
    const loadingParagraph = document.createElement("p")
    loadingParagraph.innerHTML = `
        <span class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
        </span>
    `
    
    loadingArticle.append(loadingParagraph)
    conversationContainer.append(loadingArticle)
    scrollToBottom()
}

export function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById("loading-indicator")
    if (loadingIndicator) {
        loadingIndicator.remove()
    }
}
