document.addEventListener('DOMContentLoaded', (event) => {
    // Optionally, display an initial message from Professor Fish if needed
    displayMessage("====THIS IS DEMO====", "assistant");
});

let userMessages = [];
let assistantMessages = [];

//variable for start function
let myDateTime = '';


function start() {
    const date = document.getElementById('date').value;
    const hour = document.getElementById('hour').value;
    if (date === '') {
        alert('생년월일을 입력해주세요.');
        return;
    }
    myDateTime = date + ' ' + hour; // Assuming you want to include a space or some delimiter
    console.log(myDateTime);

    // Assuming you want this message to show as soon as the chat starts
    let todayDateTime = new Date().toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });
    let initialAssistantMessage = `포터 선생: 너 ${myDateTime}에 태어났다는 거지? 오늘은 ${todayDateTime}이구나, 자, 운세에 대해서 어떤 것이든 물어보렴.`;

    // Display the initial message from the assistant
    displayMessage(initialAssistantMessage, "assistant");

    document.getElementById("intro").style.display = "none";
    document.getElementById("chat").style.display = "block"; // Ensure this matches your HTML
}


async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim(); // Get the message from the input and trim whitespace

    if (!message) return; // Do nothing if the message is empty

    // Display the user's message in the chat UI immediately
    displayMessage(`You: ${message}`, "user");
    userMessages.push(message);
    try {
        const response = await fetch('http://localhost:3003/professorFish', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                myDateTime: myDateTime,
                userMessages: userMessages, // Assuming this is intended to be a single message or the last message
                assistantMessages: assistantMessages, // Assuming this should actually be the last assistant message or similar

            }), // Send the message content
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        // Display the AI's response in the chat UI
        displayMessage(`포터 선생: ${responseData.assistant}`, "assistant");
        assistantMessages.push(responseData.assistant); // Assuming assistantMessages is an array tracking the conversation
        input.value = ''; // Clear the input field
    } catch (error) {
        console.error('Error:', error);
        displayMessage("Error: Could not get a response. Please try again.", "error");
    }

}

function displayMessage(message, sender) {
    const messageArea = document.getElementById('messageArea');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    // Optionally, apply different styling based on the sender
    messageElement.className = sender;

    //margin for each message area
    messageArea.appendChild(messageElement);
    // Scroll to the bottom of the message area to show the latest message
    messageArea.scrollTop = messageArea.scrollHeight;
}

