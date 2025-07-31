import { XAI } from "../../src/providers/xai";

describe("XAI", () => {
  it("should initialize correctly with valid options", () => {
    const options = { apiKey: "test-api-key" };
    const provider = new XAI(options);
    expect(provider).toBeDefined();
    expect(provider.options).toEqual(options);
  });

  it("should return the correct default language model ID", () => {
    const options = { apiKey: "test-api-key" };
    const provider = new XAI(options);
    expect(provider.defaultLanguageModelId()).toBe("grok-3-latest");
  });
});
