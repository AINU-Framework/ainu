# AINU

![AINU Banner](public/ainubanner.png)

An unopinionated and easily extensible ai framework

## Table of Contents

- [📚 Documentation](#-documentation)
- [⚙️ Installation](#️-installation)
- [🚀 Getting Started](#-getting-started)
  - [🛠️ Creating an Agent](#️-creating-an-agent)
  - [💡 Basic Example](#-basic-example)
  - [🧰 Tools](#-tools)
  - [🔗 MCP Clients](#-mcp-clients)
  - [🤖 Social Agent (WIP)](#-social-agent-wip)
- [📝 Example Repositories](#-example-repositories)

Here’s a well-structured section for your README that outlines the availability of the TypeDocs and overview documentation:

---

## 📚 Documentation

AINU provides comprehensive documentation to help you get started and dive deeper into the framework. Below is an overview of the available resources:

| **Documentation Type** | **Description**                                                                                                                                                            | **Link**                                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **TypeDocs**           | Detailed API reference generated from the source code. Includes all classes, methods, and types used in AINU. Ideal for developers looking for in-depth technical details. | [TypeDocs](https://ainu-labs.github.io/ainu/) |
| **Overview Docs**      | High-level documentation covering concepts, examples, and guides for using AINU. Perfect for understanding the framework and its use cases.                                | [Overview Docs](https://docs.ainu.pro/)       |

## ⚙️ Installation

`ainu` can be added to your project through npm.

```
npm i @ainulabs/ainu
```

## 🚀 Getting Started

### 🛠️ Creating an Agent

Creating an `Agent` is super simple and only requires a single `Provider` to be supplied.

```typescript
const provider = new Anthropic({ apikey: "your-api-key" });
const agent = new Agent({ provider });
```

### 💡 Basic Example

The following code is like the `hello, world!` of he `ainu` framework.

```typescript
import { Agent, Anthropic, Tool } from "@ainu/ai";
import { z } from "zod";

async function main() {
  // create the model provider
  const provider = new Anthropic({
    apiKey: "your-api-key",
  });

  // create a simple tool
  const weather = new Tool("getWeather", {
    description: "Get the weather at a given location",
    parameters: z.object({ location: z.string() }),
    handler: ({ location }) => 100,
  });

  // create the agent
  const agent = new Agent({
    provider,
    tools: [tool],
    settings: {
      // optional agent settings
      system: "You are a helpful and charming assistant",
    },
  });

  // use the agent to generateText
  const response = await agent.generateText({
    prompt: "Hello, how are you?",
    maxSteps: 3,
  });

  console.log(response.data?.text);
}

main();
```

### 🧰 Tools

Tools can be provided in three ways:

1. Through the constructor.
2. By calling `.putTool` on an agent instance.
3. By passing the `tools` parameter directly into a `.generateText` call.

The first two methods persist the tools in the agent's class, while the third method discards the tool after it is used.

---

#### Example 1: Providing Tools Through the Constructor

```typescript
import z from "zod";
import { Agent } from "./agent";
import { Anthropic } from "./providers";
import { Tool } from "./tools";

const populationTool = new Tool("getPopulation", {
  description: "Get the population of any location",
  parameters: z.object({
    location: z.string(),
  }),
  handler: async (args) => {
    // call some external system
    return { population: 1000000 };
  },
});

const agent = new Agent({
  provider: new Anthropic({
    apiKey: "your-api-key",
  }),
  tools: [populationTool], // Add tools during agent creation
});
```

---

#### Example 2: Adding Tools Dynamically Using `.putTool`

```typescript
import z from "zod";
import { Agent } from "./agent";
import { Anthropic } from "./providers";
import { Tool } from "./tools";

const populationTool = new Tool("getPopulation", {
  description: "Get the population of any location",
  parameters: z.object({
    location: z.string(),
  }),
  handler: async (args) => {
    // call some external system
    return { population: 1000000 };
  },
});

const agent = new Agent({
  provider: new Anthropic({
    apiKey: "your-api-key",
  }),
});

// Add the tool dynamically
agent.putTool(populationTool);
```

---

#### Example 3: Passing Tools Directly to `.generateText`

```typescript
import z from "zod";
import { Agent } from "./agent";
import { Anthropic } from "./providers";
import { Tool } from "./tools";

const populationTool = new Tool("getPopulation", {
  description: "Get the population of any location",
  parameters: z.object({
    location: z.string(),
  }),
  handler: async (args) => {
    // call some external system
    return { population: 1000000 };
  },
});

const agent = new Agent({
  provider: new Anthropic({
    apiKey: "your-api-key",
  }),
});

// Use the tool directly in a generateText call
const result = await agent.generateText({
  prompt: "What is the population of the US?",
  tools: [populationTool], // Pass tools directly
});
```

---

These examples demonstrate the flexibility of tools in AINU. You can choose the method that best fits your use case, whether it's adding tools during agent creation, dynamically adding them later, or using them for specific tasks on the fly.

### 🔗 MCP Clients

You may also wish to supply your agent with access to an MCP server.

```typescript
import { Agent, Anthropic, MCP } from "@ainu/ai";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from "path";

// Create a MCP instances and pass in the name, version and transport
const solanaMcpClient = new MCP({
  name: "Solana MCP Client",
  version: "1.0.0",
  transport: new StdioClientTransport({
    command: "node",
    args: ["dist/mcp/server.js"],
  }),
});

// Add one or more clients to your agent.
export const agent = new Agent({
  settings: {
    system: "You are a helpful assistant.",
    maxSteps: 5,
  },
  provider: new Anthropic({
    apiKey: "your-api-key",
  }),
  clients: [solanaMcpClient],
});
```

## 🤖 Social Agent (WIP)

This is just an example and none of the twitter functionality is actually complete here.
I will create a seprate registry tools.

```typescript
import { Agent, Anthropic, Tool } from "@ainu/ai";
import { input } from "@inquirer/prompts";
import "dotenv/config";
import z from "zod";

// Prep the tiny agent
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const agent = new Agent({
  provider: anthropic,
  settings: {
    maxSteps: 5 //required for the agent to chain tool calls and inference
  }
});

// create a loading function that gets all information relevant for to the agent
function mockLoadContext() {
  return {
    Name: "Artificial Inu",
    Age: 5,
    Location: "Solana",
    Interests: ["AI", "Blockchain", "Web3"],
    FavoriteColor: "Blue",
    FavoriteFood: "Pizza",
    mentions: [
      { from: "user1", text: "Hello, how are you?" },
      { from: "user2", text: "What is your favorite color?" },
      { from: "user3", text: "Do you like pizza?" },
    ],
    recentTweets: [
      { text: "Just had a great pizza!", date: "2023-10-01" },
      { text: "Loving the new AI features!", date: "2023-10-02" },
      { text: "Blockchain is the future!", date: "2023-10-03" },
    ],
  };
}

const loadContext = new Tool("loadContext", {
  description:
    "Load the context before writing a tweet. Must be called before calling 'tweet'. Return the context as a string.",
  handler: () => ({ context: formatContext(mockLoadContext()) }),
});

// add the tool to the agent
agent.putTool(loadContext);

// create a tool that posts tweets. Here you would use the twitter-sdk
const tweet = new Tool("tweet", {
  description: "Post a tweet to Twitter. ",
  parameters: z.object({
    context: z.string();
  }),
  handler: async ({context}) => {
    const generateTweet = agent.generateText({
      prompt: `${context}
      # Task
      Your task is to generate compelling tweets based on all the information above`,
      maxSteps: 5,
      temperature: 0.7,
    });
  },
});

// Add the tool to the agent
agent.putTool(tweet);

async function main() {
  // Here if you ask the agent to write a tweet it will call the tweet tool
  const userMessage = await input({
    message: "You: ",
    validate: (input) => {
      return input.trim() !== "" ? true : "Please enter a message.";
    },
  });

  const response = await agent.generateText({
    prompt: userMessage,
  });

  // Check if the response is valid
  if (!response || !response.success) {
    console.error("Error:", response.error);
    return;
  }

  console.log(`Agent: ${response.data?.text}`);
}

main();
```

## 📝 Example Repositories

Example Repo's will be added to a list below.
