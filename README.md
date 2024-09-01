# Skynet.js

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the required modules:
    ```sh
    npm install
    ```

## Usage

Run the script using Node.js:
```sh
node skynet.js

### Plan
1. Create a `README.md` file.
2. Add sections for installation, usage, and explanation of the logic flow.
3. Explain the purpose of pushing the user role from one AI to the other.

### Code
```markdown
# Skynet.js

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the required modules:
    ```sh
    npm install
    ```

## Usage

Run the script using Node.js:
```sh
node skynet.js
```

## How It Works

### Overview

[`skynet.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fd%3A%2FMyStuff%2Fgit-repos%2Fai-vs-ai%2Fsrc%2Fskynet.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "d:\MyStuff\git-repos\ai-vs-ai\src\skynet.js") simulates a debate between two OpenAI instances (AI1 and AI2). The script alternates between the two AIs, sending the response from one AI as the input to the other, and vice versa. This continues until a predefined number of messages have been exchanged.

### App Logic Flow

1. **Initialization**: The script initializes conversation histories for both AI1 and AI2.
2. **Debate Simulation**: The [`simulateDebate`](command:_github.copilot.openSymbolFromReferences?%5B%22simulateDebate%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22d%3A%5C%5CMyStuff%5C%5Cgit-repos%5C%5Cai-vs-ai%5C%5Csrc%5C%5Cskynet.js%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fd%253A%2FMyStuff%2Fgit-repos%2Fai-vs-ai%2Fsrc%2Fskynet.js%22%2C%22path%22%3A%22%2Fd%3A%2FMyStuff%2Fgit-repos%2Fai-vs-ai%2Fsrc%2Fskynet.js%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A51%2C%22character%22%3A15%7D%7D%5D%5D "Go to definition") function alternates between AI1 and AI2, sending the response from one AI as the input to the other.
    - **Turn Alternation**: On each turn, the script checks if it's AI1's or AI2's turn to respond.
    - **Message Handling**: The response from the current AI is pushed to both conversation histories:
        - As an [`assistant`](command:_github.copilot.openSymbolFromReferences?%5B%22assistant%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22d%3A%5C%5CMyStuff%5C%5Cgit-repos%5C%5Cai-vs-ai%5C%5Csrc%5C%5Cskynet.js%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fd%253A%2FMyStuff%2Fgit-repos%2Fai-vs-ai%2Fsrc%2Fskynet.js%22%2C%22path%22%3A%22%2Fd%3A%2FMyStuff%2Fgit-repos%2Fai-vs-ai%2Fsrc%2Fskynet.js%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A60%2C%22character%22%3A47%7D%7D%5D%5D "Go to definition") role in its own history.
        - As a [`user`](command:_github.copilot.openSymbolFromReferences?%5B%22user%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22d%3A%5C%5CMyStuff%5C%5Cgit-repos%5C%5Cai-vs-ai%5C%5Csrc%5C%5Cskynet.js%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fd%253A%2FMyStuff%2Fgit-repos%2Fai-vs-ai%2Fsrc%2Fskynet.js%22%2C%22path%22%3A%22%2Fd%3A%2FMyStuff%2Fgit-repos%2Fai-vs-ai%2Fsrc%2Fskynet.js%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A61%2C%22character%22%3A47%7D%7D%5D%5D "Go to definition") role in the opposing AI's history.
3. **Completion**: The debate continues until a total of 20 messages have been exchanged. The final chat history is then output to the console.

### Why Push the User Role from One AI to the Other?

By pushing the [`user`](command:_github.copilot.openSymbolFromReferences?%5B%22user%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22d%3A%5C%5CMyStuff%5C%5Cgit-repos%5C%5Cai-vs-ai%5C%5Csrc%5C%5Cskynet.js%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fd%253A%2FMyStuff%2Fgit-repos%2Fai-vs-ai%2Fsrc%2Fskynet.js%22%2C%22path%22%3A%22%2Fd%3A%2FMyStuff%2Fgit-repos%2Fai-vs-ai%2Fsrc%2Fskynet.js%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A61%2C%22character%22%3A47%7D%7D%5D%5D "Go to definition") role from one AI to the other, the script ensures that each AI perceives the other AI as a user. This is crucial for simulating a debate, as it allows each AI to respond to the other as if it were a human user, maintaining the context and flow of the conversation.

## Example

Here is a simplified example of how the conversation might flow:

1. **AI1**: Responds to the initial prompt.
2. **AI2**: Receives AI1's response as a user input and generates its own response.
3. **AI1**: Receives AI2's response as a user input and generates a new response.
4. **Repeat**: This alternation continues until the predefined message limit is reached.

## Conclusion

[`skynet.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fd%3A%2FMyStuff%2Fgit-repos%2Fai-vs-ai%2Fsrc%2Fskynet.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "d:\MyStuff\git-repos\ai-vs-ai\src\skynet.js") effectively simulates a debate between two AI instances by cleverly managing conversation histories and roles, ensuring a coherent and engaging interaction between the two AIs.
```