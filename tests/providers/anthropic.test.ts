import { Anthropic } from "../../src";

describe("Anthropic", () => {
  it("should initialize correctly with valid options", () => {
    const options = { apiKey: "test-api-key" };
    const provider = new Anthropic(options);
    expect(provider).toBeDefined();
    expect(provider.options).toEqual(options);
  });

  it("should return the correct default language model ID", () => {
    const options = { apiKey: "test-api-key" };
    const provider = new Anthropic(options);
    expect(provider.defaultLanguageModelId()).toBe("claude-3-5-haiku-latest");
  });
});
