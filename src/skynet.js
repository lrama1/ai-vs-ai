const OpenAI = require('openai');
require('dotenv').config();

// Initialize two instances of OpenAI
const openai1 = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const openai2 = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Define the initial system messages for both instances
const initialMessage1 = { role: 'system', content: 'You are AI1, arguing in favor of renewable energy as the best solution to current energy needs. Limit your answers to 60 words or less.' };
const initialMessage2 = { role: 'system', content: 'You are AI2, arguing in favor of coal based energy as the best solution to current energy needs. Limit your answers to 60 words or less.' };

// Initialize conversation history for both AIs
let conversationHistory1 = [initialMessage1];
let conversationHistory2 = [initialMessage2];

// Function to get the next message from OpenAI instance 1
async function getNextMessageFromAI1(messages) {
    const response = await openai1.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7,
    });

    const retVal = response.choices[0].message;
    console.log('======================================================')
    console.log('OpenAI API Response (AI1):', retVal);
    return retVal;
}

// Function to get the next message from OpenAI instance 2
async function getNextMessageFromAI2(messages) {
    const response = await openai2.chat.completions.create({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7,
    });

    const retVal = response.choices[0].message;
    console.log('======================================================')
    console.log('OpenAI API Response (AI2):', retVal);
    return retVal;
}

// Function to simulate the debate
async function simulateDebate() {
    let turn = 0;

    while (conversationHistory1.length + conversationHistory2.length < 20) {
        let nextMessage;

        // Alternate between AI1 and AI2
        if (turn % 2 === 0) {
            nextMessage = await getNextMessageFromAI1(conversationHistory1);
            conversationHistory1.push({ role: 'assistant', content: nextMessage.content });
            conversationHistory2.push({ role: 'user', content: nextMessage.content });
        } else {
            nextMessage = await getNextMessageFromAI2(conversationHistory2);
            conversationHistory2.push({ role: 'assistant', content: nextMessage.content });
            conversationHistory1.push({ role: 'user', content: nextMessage.content });
        }

        turn++;
    }

    // Output the final chat history
    console.log('Debate Complete. Final Chat History:');
    conversationHistory1.forEach((message, index) => {
        console.log(`${message.role === 'system' ? 'System' : message.role === 'assistant' ? 'AI1' : 'AI2'}: ${message.content}`);
    });
}

// Run the debate simulation
simulateDebate().catch(error => {
    console.error('Error during debate simulation:', error);
});