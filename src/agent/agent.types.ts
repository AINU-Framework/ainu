import { generateText, streamText } from "ai";
import { MCP } from "../mcp/mcp";
import { Provider } from "../providers";
import { Tool } from "../tools";
import type { Agent } from "./agent";

export interface AgentSettings {
  /** The system prompt for the agent. */
  system?: string;

  /** The maximum number of chained calls the agent should do during tool execution */
  maxSteps?: number;

  /** The maximum number of tokens to generate */
  maxTokens?: number;

  /** The temperature of the model */
  temperature?: number;

  /** The top_p of the model */
  topP?: number;

  /** The frequency penalty of the model */
  frequencyPenalty?: number;

  /** The presence penalty of the model */
  presencePenalty?: number;
}

/**
 * Options for configuring a Agent instance.
 *
 * @template T - A generic type that extends Provider.
 */
export interface AgentOptions<T extends Provider<any, any, any>> {
  /** The provider instance for the agent. */
  provider: T;

  /** The tools available to the agent. */
  tools?: Tool[] | Record<string, Tool>;

  /**
   * A list of MCP clients available to the agent.
   */
  clients?: MCP[];

  /** An optional name for the agent instance. Defaults to Agent */
  name?: string;

  /** The settings for the agent.
   * These will override the default settings returned by {@link Agent.defaultSettings}.
   * An empty object will result in no settings being applied.
   * Providing undefined or not providing settings will use the default settings.
   */
  settings?: AgentSettings;
}

/**
 * A utility type to extract the parameters from the `generateText` function.
 * This is useful for creating a type that matches the parameters used in the agent's text generation.
 */
export type VercelGenerateTextParams = Omit<
  Parameters<typeof generateText>[0],
  "model" | "tools"
>;

export type VercelStreamTextParams = Omit<
  Parameters<typeof streamText>[0],
  "model" | "tools"
>;

export type GenerateStreamParams = VercelStreamTextParams & {
  tools?: Tool[];
  /** The model ID to use for generation. */
  modelId?: string;
};

/** Parameters for generating text using the agent. */
export type GenerateTextParams = VercelGenerateTextParams & {
  tools?: Tool[];

  /** The model ID to use for generation. */
  modelId?: string;
};
