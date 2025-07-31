import { CoreMessage, Message } from "ai";
import { InternalError } from "./error";

/**
 * A generic message type that can be used to represent user and assistant messages.
 */
export type InternalMessage = CoreMessage[] | Omit<Message, "id">[];

/** Requires at least prompt or messages to be specified. */
export interface GetMessageParams {
  prompt?: string;
  messages?: InternalMessage;
}

/** Converts a prompt to a CoreMessage[] or returns the messages if prompt is not specified. */
export function getMessages({
  prompt,
  messages,
}: GetMessageParams): InternalMessage {
  if (!prompt && (!messages || messages.length === 0)) {
    throw new InternalError("Prompt or messages are required");
  }

  return prompt ? [{ role: "user", content: prompt }] : messages || [];
}
