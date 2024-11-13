require("dotenv").config()
const prompt = require('prompt-sync')()

const chatGPT = "https://api.openai.com/v1/chat/completions"
const chatGPTKey = process.env.CHATGPT_API_KEY
const tasty = "https://tasty.p.rapidapi.com/recipes/list?from=0&size=5&q="

console.log("Heyyy this is a mealBot. If you don't what to eat, ask me with the type of food you want. ")
console.log("You can choose between breakfast, lunch, dinner. You can also specify if you want your meal to be vegan. ")
console.log("Type your request in full sentence. ")
let userMeal = prompt("")

if (userAsk.includes("world")){
    
}

let userAsk = {
    messages: [{ role: "system", content: userMeal }], 
    model: "gpt-4o", 
}

async function askChatGPT(userAsk){
    try {
        const options = {
            method: "POST", 
            headers: {
                Authorization: "Bearer " + chatGPTKey, 
                "Content-Type": "application/json", 
            }, 
            body: JSON.stringify(userAsk)
        }
        const response = await fetch(chatGPT, options) 
        if (response.ok === false) {
            console.log("HTTP error! Status: " + response.status)
        }
        const data = await response.json()
        console.log(data["choices"][0]["message"]["content"])
    }
    catch(error) {
        console.log("An error occurred: " + error.message)
    }
}
askChatGPT(userAsk)