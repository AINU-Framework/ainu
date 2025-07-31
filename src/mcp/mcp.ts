import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { Tool } from "../tools";
import { err, MCPError, ok, Result } from "../utils";
import { MCPClientSettings } from "./mcp.types";

/**
 * MCP creates an interface between Agent and the Model Context Protocol (MCP) SDK.
 */
export class MCP {
  /** The MCP client instance */
  client: Client;

  /** Whether the client is connected */
  connected: boolean = false;

  /** The tools available to the client */
  toolMap: Record<string, Tool> = {};

  /** The resources available to the client */
  resourceMap: Record<string, Tool> = {};

  /** The prompts available to the client */
  promptMap: Record<string, string> = {};

  constructor(public settings: MCPClientSettings) {
    this.client = new Client({
      name: settings.name,
      version: settings.version,
      transport: settings.transport,
    });
  }

  /**
   * Attach the MCP Client instance to the transport.
   * Does nothing if the client is already connected.
   */
  async connect() {
    if (this.connected) {
      return;
    }
    try {
      await this.client.connect(this.settings.transport);
      this.connected = true;
    } catch (error) {
      console.error("Error connecting to MCP client:", error);
      this.connected = false;
    }
  }

  /**
   * Fetches the tools from the MCP client and converts them to Tool instances.
   */
  async tools() {
    let result: Result<Record<string, Tool>> = ok({});
    try {
      await this.connect();

      // Fetch tools from the MCP client
      // and convert them to Tool instances
      const remoteTools = await this.client.listTools();
      if (!remoteTools) {
        throw new MCPError("No tools found");
      }

      // Construct Tool instances from the MCP tools
      // and add them to the toolMap
      for (const tool of remoteTools.tools) {
        this.toolMap[tool.name] = Tool.fromMCP({
          ...tool,
          handler: async (args) => {
            return await this.executeTool(tool.name, args);
          },
        });
      }

      result = ok(this.toolMap);
    } catch (error) {
      result = err(error);
    } finally {
      return result;
    }
  }

  /**
   * Executes a tool by name and parameters.
   * This method will connect to the MCP client,
   * call the tool, and then disconnect.
   */
  private async executeTool(name: string, parameters: any) {
    let result: Result<any> = ok(undefined);
    try {
      await this.connect();

      const response = await this.client.callTool({
        name,
        arguments: parameters || {},
      });

      if (!response) {
        throw new MCPError("No response from tool");
      }

      result = ok(response);
    } catch (error) {
      result = err(error);
    } finally {
      return result;
    }
  }

  /**
   * Disconnects the MCP client.
   */
  async disconnect() {
    if (this.connected) {
      await this.client.close();
      this.connected = false;
    }
  }
}
