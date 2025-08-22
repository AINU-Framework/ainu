import { OpenAI } from "../../src";

describe("OpenAI", () => {
  it("should initialize correctly with valid options", () => {
    const options = { apiKey: "test-api-key" };
    const provider = new OpenAI(options);
    expect(provider).toBeDefined();
    expect(provider.options).toEqual(options);
  });

  it("should return the correct default language model ID", () => {
    const options = { apiKey: "test-api-key" };
    const provider = new OpenAI(options);
    expect(provider.defaultLanguageModelId()).toBe("chatgpt-4o-latest");
  });
});
