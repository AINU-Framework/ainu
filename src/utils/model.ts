import { InternalError } from "./error";

/**
 * validates either the modelId or defaultModelId is provided.
 * If neither is provided, it throws an {@link InternalError}.
 *
 */
export function getModelId(modelId?: string, defaultModelId?: string) {
  if (!modelId && !defaultModelId) {
    throw new InternalError("Model ID is required");
  }
  return (modelId || defaultModelId) as string;
}
