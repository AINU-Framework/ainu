import { jsonSchema } from "ai";
import { z } from "zod";
import { Tool } from "../../src/tools/tools";
import { ToolConfig } from "../../src/tools/tools.types";

describe("Tool", () => {
  const mockConfig: ToolConfig = {
    description: "testTool",
    parameters: z.object({
      param: z.string(),
    }),
    handler: ({ param }) => true,
  };

  let tool: Tool;
  beforeEach(() => {
    tool = new Tool("toolName", mockConfig);
  });

  it("should initialize correctly with valid ToolConfig", () => {
    expect(tool.config).toBe(mockConfig);
  });

  it("should call return the correct result when build is invoked", () => {
    const tool = new Tool("toolName", {
      description: "testTool",
      parameters: z.object({
        param: z.string(),
      }),
      handler: ({ param }) => ({
        success: true,
        param,
      }),
    });
    const result = tool.build();
    expect(result).toBeDefined();
    expect(result.description).toBeDefined();
    expect(result.parameters).toBeDefined();
  });

  it("should build a tool when parameters are a json schema", () => {
    const tool = new Tool("toolName", {
      description: "testTool",
      parameters: jsonSchema({
        type: "object",
        properties: {
          testKey: {
            type: "string",
          },
        },
        required: ["testKey"],
        additionalProperties: false,
        $schema: "http://json-schema.org/draft-07/schema#",
      }),
      handler: ({ testKey }) => ({
        success: true,
        testKey,
      }),
    });

    const result = tool.build();
    expect(result).toBeDefined();
    expect(result.description).toBeDefined();
    expect(result.parameters).toBeDefined();
  });
});
