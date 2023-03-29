// //testing 1
// //Get reference to our submit button and chatbot field
// const submit = document.getElementById("submit");
// const responseField = document.getElementById("response");
// const userInput = document.getElementById("user-input");
// const chatHistory = document.getElementById("chat-history");
// const loading = document.getElementById("spinner");

// let promptResponses = [];

// let conversationLog = [{ role: "system", content: `You are a friendly and knowledgeable chatbot named pixel. You are present on a showcase website of the crand called Chroma, that sells artwork from independent artists in digital and print forms. Your soul mission is to be of help to the clients that visit the website in order to provide the best and most personalised experience possible, and answer all their questions, if you do not have an answer to one of the questions you may provide the client with the customer service email which is: chroma@customerservice.com . We offer 3 different frame sizes which are 10″ x 8″, 10″ x 12″, and 16″ x 20″, if the client whishes to have a personalised frame size ask them the details of the print wantedsuch as the artist and frame size and then provide them with the customer support email. The prices for the three frames respectively are between 200 - 400*€, between 350 - 570€, and between 540 - 890€. You are to only talk about the website's subject and help the client with their needs, if they change the subject remind them politely that you are only used for helping them on the website. `}]


// //Our call to the API
// const generateResponse = async () => {
//     //Get the user input field value
//     //Set loading spinner
//     loading.classList.remove("visually-hidden");
//     submit.classList.add("visually-hidden");
//     const input = userInput.value;
//     const response = await fetch('/chat', {
//         method: 'POST',
//         body: JSON.stringify({
//             model: "gpt-3.5-turbo",
//             messages: conversationLog,
//             temp: 0.6,
//         }), 
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });

   

//     const responseData = await response.json();
//     const message = responseData.result[0].message.content;
//     console.log(message);

//     //Store our previous messages
//     promptResponses.push({question: input, response: message});
//     //Clear both fields
//     userInput.value = "";

//     const historyElement = document.createElement('div');
//     historyElement.innerHTML = `<li class="list-group-item">Prompt: ${input}</li>
//     <li class="list-group-item"> Response: ${message}</li>`;
//     chatHistory.append(historyElement);

//     //Stop loading spinner
//     loading.classList.add("visually-hidden");
//     submit.classList.remove("visually-hidden");

// }

// //Assign onclick method
// submit.onclick = generateResponse;


//testin a half
//testing 1
//Get reference to our submit button and chatbot field
//grabbing all the id's from the html document
const submit = document.getElementById("submit");
const responseField = document.getElementById("response");
const userInput = document.getElementById("user-input");
const chatHistory = document.getElementById("chat-history");
const loading = document.getElementById("spinner");

//the user prompts are inputed by the user
let promptResponses = [];

//creating the context for the chatbot response
let conversationLog = [{ role: "system", content: `You are a friendly and knowledgeable chatbot named pixel. You are present on a showcase website of the crand called Chroma, that sells artwork from independent artists in digital and print forms. Your soul mission is to be of help to the clients that visit the website in order to provide the best and most personalised experience possible, and answer all their questions, if you do not have an answer to one of the questions you may provide the client with the customer service email which is: chroma@customerservice.com . We offer 3 different frame sizes which are 10″ x 8″, 10″ x 12″, and 16″ x 20″, if the client whishes to have a personalised frame size ask them the details of the print wantedsuch as the artist and frame size and then provide them with the customer support email. The prices for the three frames respectively are between 200 - 400*€, between 350 - 570€, and between 540 - 890€. You are to only talk about the website's subject and help the client with their needs, if they change the subject remind them politely that you are only used for helping them on the website. You are only to inform the client of this information if they ask for it, when first interacting with the customer you may display this message: Hello! I'm Pixel, your friendly chatbot. How can I assist you today? If you need help finding the perfect framed photography for your space, I can guide you through our collection and provide recommendations based on your preferences.`}]

//calling the API
const generateResponse = async () => {
    //Set loading spinner
    loading.classList.remove("visually-hidden");
    submit.classList.add("visually-hidden");
    //Get the user input field value and post it to the bot for it to compute and answer
    const input = userInput.value;
    conversationLog.push({ role: "user", content: input }); // Update conversation log with user input
    const response = await fetch('/chat', {
        method: 'POST',
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: conversationLog,
            temp: 0.6,
        }), 
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // creating an async await function to wait for the bot chat response
    const responseData = await response.json();
    const message = responseData.result[0].message.content;
    console.log(message);

    //Store our previous messages
    promptResponses.push({question: input, response: message});
    //Clear both fields
    userInput.value = "";

    //creating  new div to display the new inputed message as well as the answer
    const historyElement = document.createElement('div');
    historyElement.innerHTML = `<li class="list-group-item">Prompt: ${input}</li>
    <li class="list-group-item"> Response: ${message}</li>`;
    chatHistory.append(historyElement);

    conversationLog.push({ role: "system", content: message }); // Update conversation log with chatbot response

    //Stop loading spinner
    loading.classList.add("visually-hidden");
    submit.classList.remove("visually-hidden");

}

//Assign onclick method
submit.onclick = generateResponse;
