import {
  createOpenAI,
  OpenAIProvider,
  OpenAIProviderSettings,
} from "@ai-sdk/openai";
import { OpenAIChatModelId, OpenAIImageModelId } from "@ai-sdk/openai/internal";
import { Provider } from "./base";

export class OpenAI extends Provider<
  OpenAIProvider,
  OpenAIProviderSettings,
  OpenAIChatModelId | OpenAIImageModelId
> {
  constructor(options: OpenAIProviderSettings) {
    super({
      ...options,
    });
    this.provider = createOpenAI(this.options);
  }

  defaultLanguageModelId(): OpenAIChatModelId {
    return "chatgpt-4o-latest";
  }

  defaultImageModelId(): OpenAIImageModelId {
    return "dall-e-3";
  }
}
