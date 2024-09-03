// Initialize a variable to store the user's name
let name = "";

// Function to toggle the chat window visibility
function toggleChat() {
    console.log("Chat icon clicked!"); // This should appear in the console when the icon is clicked
    const chatBox = document.getElementById("chat-box");
    chatBox.classList.toggle("hidden");
    if (!chatBox.classList.contains("hidden")) {
        document.getElementById("user-input").focus();
    }
}



// Function to collect the user's name
function collectName() {
    name = document.getElementById("user-input").value; // Get the user's name from the input field
    if (!name) { // If the name is not provided, show an alert
        alert("Please enter your name.");
        return;
    }
    // Update the chat message to ask for the user's phone number
    document.getElementById("chat-message").innerText = `Thanks, ${name}! Can I have your phone number?`;
    document.getElementById("user-input").value = ""; // Clear the input field
    document.getElementById("user-input").placeholder = "Enter your phone number"; // Change the placeholder text
    document.querySelector("button").onclick = collectPhone; // Change the button's click event to collect the phone number
}

// Function to collect the user's phone number
function collectPhone() {
    const phone = document.getElementById("user-input").value; // Get the user's phone number from the input field
    if (!phone) { // If the phone number is not provided, show an alert
        alert("Please enter your phone number.");
        return;
    }

    // Send the name and phone number to the server
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, phone: phone }), // Send the data as JSON
    })
    .then(response => response.json())
    .then(data => {
        // Update the chat message with the response from the server
        document.getElementById("chat-message").innerText = data.message || data.error;
        // Hide the input field and the button after submission
        document.getElementById("user-input").style.display = "none";
        document.querySelector("button").style.display = "none";
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors to the console
    });
}
