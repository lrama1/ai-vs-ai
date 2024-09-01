## How It Works
### Overview
skynet.js simulates a debate between two OpenAI instances (AI1 and AI2). The script alternates between the two AIs,  
sending the response from one AI as the input to the other, and vice versa.  
This continues until a predefined number of messages have been exchanged.

### App Logic Flow
1.  Initialization: The script initializes conversation histories for both AI1 and AI2.
2.  Debate Simulation: The simulateDebate function alternates between AI1 and AI2, sending the response from one AI as the input to the other.
    -  Turn Alternation: On each turn, the script checks if it's AI1's or AI2's turn to respond.
    -  Message Handling: The response from the current AI is pushed to both conversation histories:
      -  As an assistant role in its own history.
      -  As a user role in the opposing AI's history.
3.  Completion: The debate continues until a total of 20 messages have been exchanged. The final chat history is then output to the console.

### Why Push the User Role from One AI to the Other?
By pushing the user role from one AI to the other, the script ensures that each AI perceives the other AI as a user.  
This is crucial for simulating a debate, as it allows each AI to respond to the other  
as if it were a human user, maintaining the context and flow of the conversation.

## Example
Here is a simplified example of how the conversation might flow:

1.  AI1: Responds to the initial prompt.
2.  AI2: Receives AI1's response as a user input and generates its own response.
3.  AI1: Receives AI2's response as a user input and generates a new response.
4.  Repeat: This alternation continues until the predefined message limit is reached.

## Conclusion
skynet.js effectively simulates a debate between two AI instances by cleverly managing conversation histories and roles, ensuring a coherent and engaging interaction between the two AIs. ```