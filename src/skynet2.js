const OpenAI = require('openai');
require('dotenv').config();

const requirements = `Build a chatbot framework which allows multiple agents to collaborate on a conversation to ultimately answer the prompts posed by the user.
    The prompts can contain multiple topics since the user will be typing in natural language, 
    and the framework should be able to delegate to the appropriate agent.  All answers provided by the agents should 
    be aggregated and presented to the user in a coherent manner.  The agents should be able to switch between topics and provide answers in a conversational manner.`;

// Number of AI agents
const numAgents = 3; // Change this to the desired number of agents

// Initialize instances of OpenAI and conversation histories
const openaiInstances = [];
const agentNames = ['Architect', 'John', 'Jane']; // Add agent names
const initialMessages = [
    {
        role: 'system', content: `You are a Senior Software Architect who is 
                                 an expert in AWS brainstorming on whether to utilize LangGraph, CrewAI, or Semantic Kernel to build a chatbot framework. 
                                 Frame your answers in the context of the requirements specified here: ${requirements}.
                                 Limit your answers to 100 words or less but spend additional time in making sure your answers adhere to the requirements.` },
    {
        role: 'system', content: `You are a NodeJS Software Engineer who is 
                                an expert on AWS Lambda brainstorming on whether to utilize LangGraph, CrewAI, or Semantic Kernel to build a chatbot framework. 
                               Frame your answers in the context of the requirements specified here: ${requirements}.
                               Limit your answers to 100 words or less but spend additional time in making sure your answers adhere to the requirements.`  },
    {
        role: 'system', content: `You are a NodeJS Software Engineer who is 
                                    an expert in Typescript brainstorming on whether to utilize LangGraph, CrewAI, or Semantic Kernel to build a chatbot framework. 
                                    Frame your answers in the context of the requirements specified here: ${requirements}.
                                    Limit your answers to 100 words or less but spend additional time in making sure your answers adhere to the requirements.` }
];
const conversationHistories = [];

// Initialize OpenAI instances and conversation histories
for (let i = 0; i < numAgents; i++) {
    openaiInstances.push(new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));
    conversationHistories.push([initialMessages[i % initialMessages.length]]);
}

// Function to get the next message from an OpenAI instance
async function getNextMessageFromAI(openaiInstance, messages, agentName) {
    const response = await openaiInstance.chat.completions.create({
        model: 'gpt-4o-2024-08-06',
        messages: messages,
        max_tokens: 500,
        temperature: 0.2,
    });

    const retVal = response.choices[0].message;
    console.log('======================================================');
    console.log(`${agentName} (OpenAI API Response):`, retVal);
    return retVal;
}

// Function to simulate the debate
async function simulateDebate() {
    let turn = 0;
    let totalConversationLength = 0;
    while (totalConversationLength < 31) {
        const currentAgentIndex = turn % numAgents;

        const nextMessage = await getNextMessageFromAI(openaiInstances[currentAgentIndex], conversationHistories[currentAgentIndex], agentNames[currentAgentIndex]);
        conversationHistories[currentAgentIndex].push({ role: 'assistant', content: nextMessage.content });

        // Push the message to all other agents
        for (let i = 0; i < numAgents; i++) {
            if (i !== currentAgentIndex) {
                conversationHistories[i].push({ role: 'user', content: nextMessage.content });
            }
        }

        totalConversationLength = conversationHistories.reduce((sum, history) => sum + history.length, 0);
        turn++;
    }

    // Ask the first agent to summarize the discussion and generate an architecture diagram
    const summaryPrompt = {
        role: 'user',
        content: `Please summarize the entire discussion and come up with a decision and just pick one.
            Enumarate the reasons for your decision and provide a brief explanation of why you chose that option.
            Also, enumerate the reasons for rejecting the other options.
            Also, generate an architecture diagram in Mermaid syntax based on the final decision.`
    };
    conversationHistories[0].push(summaryPrompt);

    const summaryMessage = await getNextMessageFromAI(openaiInstances[0], conversationHistories[0], agentNames[0]);
    conversationHistories[0].push({ role: 'assistant', content: summaryMessage.content });

    // Output the final chat history
    console.log('Debate Complete. Final Chat History:');
    conversationHistories.forEach((history, agentIndex) => {
        console.log(`Agent ${agentIndex + 1} (${agentNames[agentIndex]}):`);
        history.forEach((message) => {
            if (message.role !== 'system') {
                console.log(`${message.role === 'assistant' ? agentNames[agentIndex] : 'User'}: ${message.content}`);
            }
        });
    });

    // Output the summary and architecture diagram
    console.log('Summary and Architecture Diagram:');
    console.log(`${agentNames[0]}: ${summaryMessage.content}`);
}

// Run the debate simulation
simulateDebate().catch(error => {
    console.error('Error during debate simulation:', error);
});