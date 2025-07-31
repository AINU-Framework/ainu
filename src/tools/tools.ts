import { jsonSchema } from "ai";
import { MCPToolSpec } from "../mcp/mcp.types";
import { ToolConfig } from "./tools.types";
import { buildTool } from "./util";

/**
 * A class that represents a tool that can be used in {@link Agent}.
 * This class is used to help dynamically build tools for an agent,
 * by wrapping the handler function using [[buildTool]] to allow for
 * error handling, result formatting, and optional context passing.
 */
export class Tool {
  constructor(
    /** The name of the tool */
    public name: string,
    /** The tool configuration parameters */
    public config: ToolConfig
  ) {}

  build() {
    return buildTool(this.config);
  }

  /**
   * Create a new Tool instance directly from an MCP tool response.
   */
  static fromMCP({
    name,
    description = "",
    inputSchema,
    handler,
  }: MCPToolSpec): Tool {
    return new Tool(name, {
      description,
      parameters: jsonSchema(inputSchema),
      handler,
    });
  }
}
