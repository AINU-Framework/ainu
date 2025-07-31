import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { MCP } from "../../src";

const transport = new StdioClientTransport({
  args: ["test/mcp/mcp-server.js"],
  command: "node",
});

describe("MCP", () => {
  it("should initialize correctly with valid options", async () => {
    const mcp = new MCP({
      name: "testMCP",
      version: "1.0",
      transport,
    });
    expect(mcp).toBeDefined();
  });
});
