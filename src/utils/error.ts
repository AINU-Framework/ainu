/**
 * InternalError is the base class for all errors in the  library.
 */
export class InternalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InternalError";
  }
}

/**
 * ProviderError is used for errors related to providers.
 */
export class ProviderError extends InternalError {
  constructor(message: string) {
    super(message);
    this.name = "ProviderError";
  }
}

/**
 * ToolError is used for errors related to tools.
 */
export class ToolError extends InternalError {
  constructor(message: string) {
    super(message);
    this.name = "ToolError";
  }
}

/**
 * AgentError is used for errors related to agents.
 */
export class AgentError extends InternalError {
  constructor(message: string) {
    super(message);
    this.name = "AgentError";
  }
}

export class MCPError extends InternalError {
  constructor(message: string) {
    super(message);
    this.name = "MCPError";
  }
}

export function getErrorMessage(error: unknown): string {
  let message: string;
  if (error instanceof InternalError) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Unknown error occurred";
  }
  return message;
}
