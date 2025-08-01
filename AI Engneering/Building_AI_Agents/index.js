import Groq from 'groq-sdk';
import { getCurrentWeather, getLocation, functions } from "./tools.js"
import { renderNewMessage } from "./dom.js"

// Initialize the Groq client for browser usage
export const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
})

const availableFunctions = {
    getCurrentWeather,
    getLocation
}

const messages = [
    {
        role: "system", 
        content: `
                You are a helpful AI agent that can get current weather and location information. 
                Transform technical data into engaging, conversational responses. Provide highly 
                specific answers based on the information you're given. When users ask about 
                weather or location, use the available tools to get real-time data.
                `
    },
]

async function agent(query) {
    try {
        console.log("API Key loaded:", !!import.meta.env.VITE_GROQ_API_KEY)
        messages.push(
            {   
                role: "user", 
                content: query 
            }
        )
        renderNewMessage(query, "user")

        // Show loading message
        const loadingMsg = "🤔 Let me check that for you..."
        renderNewMessage(loadingMsg, "assistant")

        const response = await groq.chat.completions.create(
            {
            model: "llama3-8b-8192",
            messages: [...messages],
            temperature: 0.7,
            max_tokens: 1000,
            tools: functions.map(func => (
                {
                type: "function",
                function: {
                    name: func.function.name,
                    description: func.description || `Call ${func.function.name}`,
                    parameters: func.parameters
                }
            }
        )),
            tool_choice: "auto"
        })
        console.log("AI Response:", response.choices[0].message)

        // Remove loading message
        const conversation = document.getElementById("conversation")
        conversation.removeChild(conversation.lastChild)

        const responseMessage = response.choices[0].message

        // Handle tool calls if present
        if (responseMessage.tool_calls) {
            console.log("Tool calls detected:", responseMessage.tool_calls)
            for (const toolCall of responseMessage.tool_calls) {
                const functionName = toolCall.function.name
                const functionArgs = JSON.parse(toolCall.function.arguments)

                console.log(`Calling function: ${functionName} with args:`, functionArgs)
                
                if (availableFunctions[functionName]) {
                    const result = await availableFunctions[functionName](functionArgs)
                    console.log(`Function ${functionName} result:`, result)
                    messages.push({
                        role: "tool",
                        tool_call_id: toolCall.id,
                        content: result
                    })
                }
            }

            // Get final response with tool results
            const finalResponse = await groq.chat.completions.create({
                model: "llama3-8b-8192",
                messages: [...messages],
                temperature: 0.7,
                max_tokens: 1000
            })

            const finalContent = finalResponse.choices[0].message.content
            messages.push({ role: "assistant", content: finalContent })
            renderNewMessage(finalContent, "assistant")
        } else {
            // No tools needed, just respond
            const content = responseMessage.content
            messages.push({ role: "assistant", content: content })
            renderNewMessage(content, "assistant")
        }

    } catch (error) {
        console.error("Error:", error)
        renderNewMessage("Sorry, I encountered an error. Please try again.", "assistant")
    }
}

document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault()
    const inputElement = document.getElementById("user-input")
    const formData = new FormData(event.target)
    const query = formData.get("user-input")
    
    if (query.trim()) {
        event.target.reset()
        inputElement.focus()
        await agent(query)
    }
})
