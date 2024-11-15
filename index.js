// importing files 
require("dotenv").config()
const prompt = require('prompt-sync')()

// info on chatGPT
const chatGPT = "https://api.openai.com/v1/chat/completions"
const chatGPTKey = process.env.CHATGPT_API_KEY

// info on Foodish
let randomDish = "https://foodish-api.com/api/images/"
let dishLength = randomDish.length

console.log("Heyyy this is a mealBot. If you don't what to eat, ask me with the type of food you want. ")
console.log("You can choose between breakfast, lunch, dinner. ")
console.log("Type your request in full sentence. ")

// fetch and POST on chatGPT
async function askChatGPT(userAsk) {
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
        return data
    } catch (error) {
        console.log("An error occurred: " + error.message)
    }
}

// getting Foodish info
async function getDishImage(dishURL) {
    try {
        const response = await fetch(dishURL)
        if (response.ok === false) {
            console.log("HTTP error! Status: " + response.status)
        }
        const data = await response.json()
        console.log(data["image"])
    } catch (error) {
        console.log("An error occurred: " + error.message)
    }
}

async function main() {
    // getting user info
    let userMeal = prompt("")

    // request body for chatGPT
    let userAsk = {
        messages: [{
            role: "system",
            content: userMeal + ", one item with the recipe only"
        }],
        model: "gpt-4o",
    }

    const res = await askChatGPT(userAsk)
    // getting user info
    console.log("You can also check how the meal looks like by typing the name. You can choose only between biryani, burger, butter-chicken (pls enter the - sign as well or you're gonna stuck here forever), dessert, dosa, idly, pasta, pizza, rice, samosa. This random dish image API is limited so yk...")
    let dishName = prompt("")
    const dishList = ["biryani", "burger", "butter-chicken", "dessert", "dosa", "idly", "pasta", "pizza", "rice", "samosa"]
    dishName = dishName.toLowerCase()
    // checking invalid info 
    while (dishList.includes(dishName) == false) {
        console.log("Yeah I know you wanna get something special, but we don't have it, so pls enter the correct one. ")
        dishName = prompt("").toLowerCase()
    }
    randomDish = randomDish + dishName
    getDishImage(randomDish)
    let conditionForImage;

    // re-ask user info
    console.log("Do you want another meal? Type yes to continue, no to exit: ")
    let conditionForMeal = prompt("")

    let codeRunning = true
    while (codeRunning == true) {
        if (conditionForMeal == "yes") {
            console.log("Yesssssss, what do you want this time: ")
            userMeal = prompt("")
            askChatGPT(userAsk)

            console.log("Another image too? ")
            conditionForImage = prompt("")
            if (conditionForImage == "yes") {
                console.log("Okay type the dish name: ")
                let modifiedDishName = prompt()
                modifiedDishName = modifiedDishName.toLowerCase()
                dishName = dishName.slice(0, dishLength)
                dishName = dishName + modifiedDishName
                getDishImage(dishName)
            }

            console.log("Do you want another meal? Type yes to continue, no to exit: ")
            conditionForMeal = prompt("")
        } else if (conditionForMeal == "no") {
            console.log("Okay bye or whatever. ")
            codeRunning = false
        } else {
            console.log("Don't play with me... please enter yes or no to continue: ")
            conditionForMeal = prompt("")
        }
    }

    console.log("So this is the end of this mealBot, Bon Appetit I guess... ")
}
main()