document.addEventListener('DOMContentLoaded', (event) => {
    // Optionally, display an initial message from Professor Fish if needed
    displayMessage("Professor Fish: Hello, I'm Professor Fish. Do you often arrive late to class?", "assistant");
});

let userMessages = [];
let assistantMessages = [];

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
                userMessages: userMessages, // Assuming this is intended to be a single message or the last message
                assistantMessages: assistantMessages, // Assuming this should actually be the last assistant message or similar
            }), // Send the message content
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        // Display the AI's response in the chat UI
        displayMessage(`Professor Fish: ${responseData.assistant}`, "assistant");
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
    messageArea.appendChild(messageElement);
    // Scroll to the bottom of the message area to show the latest message
    messageArea.scrollTop = messageArea.scrollHeight;
}