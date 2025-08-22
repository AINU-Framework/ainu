import {
  AnthropicProvider,
  AnthropicProviderSettings,
  createAnthropic,
} from "@ai-sdk/anthropic";
import { AnthropicMessagesModelId } from "@ai-sdk/anthropic/internal";
import { Provider } from "./base";

class Anthropic extends Provider<
  AnthropicProvider,
  AnthropicProviderSettings,
  AnthropicMessagesModelId
> {
  constructor(options: AnthropicProviderSettings) {
    super({
      ...options,
    });
    this.provider = createAnthropic(this.options);
  }

  defaultLanguageModelId(): AnthropicMessagesModelId {
    return "claude-3-5-haiku-latest";
  }
}

export { Anthropic, type AnthropicMessagesModelId };
