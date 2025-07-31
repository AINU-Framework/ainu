import { z } from "zod";
import { Anthropic, Tool } from "../../src";
import { Agent } from "../../src/agent/agent";

const provider = new Anthropic({
  apiKey: "test-api-key",
});

const tool = new Tool("testTool", {
  description: "testTool",
  parameters: z.object({
    param: z.string(),
  }),
});

describe("Agent", () => {
  it("should create an agent instance", () => {
    const agent = new Agent({
      provider,
    });
    expect(agent).toBeDefined();
    expect(agent.name).toBe("Agent");
    expect(agent.provider).toBeDefined();
  });

  it("should create an agent instance with a custom name", () => {
    const agent = new Agent({
      name: "testAgent",
      provider,
    });
    expect(agent).toBeDefined();
    expect(agent.name).toBe("testAgent");
  });
});

describe("Agent settings", () => {
  it("should use default settings when no settings are provided", () => {
    const agent = new Agent({
      name: "testAgent",
      provider: new Anthropic({ apiKey: "test-api-key" }),
    });
    expect(agent.settings).toEqual(agent.defaultSettings());
  });

  it("should overwrite default settings when settings are provided", () => {
    const customSettings = { system: "Custom system prompt" };
    const agent = new Agent({
      name: "testAgent",
      provider: new Anthropic({ apiKey: "test-api-key" }),
      settings: customSettings,
    });
    expect(agent.settings).toEqual(customSettings);
  });

  it("should use an empty object when settings are explicitly set to an empty object", () => {
    const agent = new Agent({
      name: "testAgent",
      provider: new Anthropic({ apiKey: "test-api-key" }),
      settings: {},
    });
    expect(agent.settings).toEqual({});
  });
});

describe("Agent tools", () => {
  it("should get a tool by name", async () => {
    const agent = new Agent({
      provider,
      tools: [tool],
      settings: {},
    });
    const retrievedTool = await agent.findTool(tool.name);
    expect(retrievedTool).toBeDefined();
  });

  it("should register a tool", async () => {
    const agent = new Agent({
      name: "testAgent",
      provider,
    });
    agent.putTool(tool);
    const retrievedTool = await agent.findTool(tool.name);

    expect(retrievedTool).toBeDefined();
  });

  it("should register a tool", async () => {
    const agent = new Agent({
      name: "testAgent",
      provider,
    });
    agent.putTool(tool);
    const retrievedTool = await agent.findTool(tool.name);
    expect(retrievedTool).toBeDefined();
  });

  it("should unregister a tool", async () => {
    const agent = new Agent({
      name: "testAgent",
      provider,
      tools: [tool],
    });
    agent.deleteTool(tool.name);
    const retrievedTool = await agent.findTool(tool.name);
    expect(retrievedTool).toBeUndefined();
  });
});
