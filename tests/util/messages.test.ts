import { CoreMessage } from "ai";
import { Error, getMessages } from "../../src";

describe("getMessages", () => {
  it("throws an error when no parameters are provided", () => {
    expect(() => getMessages({})).toThrow(Error);
  });

  it("throws an error when messages is an empty array", () => {
    expect(() => getMessages({ messages: [] })).toThrow(Error);
  });

  it("throws an error when prompt is an empty string", () => {
    expect(() => getMessages({ prompt: "" })).toThrow(Error);
  });

  it("returns messages when prompt is provided", () => {
    const result = getMessages({ prompt: "Hello" });
    expect(result).toEqual([{ role: "user", content: "Hello" }]);
  });

  it("returns messages when messages is provided", () => {
    const messages: CoreMessage[] = [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi there!" },
    ];
    const result = getMessages({
      prompt: undefined,
      messages,
    });
    expect(result).toBeDefined();
    expect(result.length).toBe(2);
    expect(result).toEqual(messages);
  });
});
