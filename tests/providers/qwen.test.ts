import { Qwen } from "../../src";

describe("Qwen", () => {
  it("should initialize correctly with valid options", () => {
    const options = { apiKey: "test-api-key" };
    const provider = new Qwen(options);
    expect(provider).toBeDefined();
    expect(provider.options).toEqual(options);
  });

  it("should return the correct default language model ID", () => {
    const options = { apiKey: "test-api-key" };
    const provider = new Qwen(options);
    expect(provider.defaultLanguageModelId()).toBe("qwen-max");
  });
});
