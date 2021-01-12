import { JSONSchemaType } from "ajv";

export type YardPlayerSetNamePayload = string;

export const YardPlayerSetNamePayload: JSONSchemaType<YardPlayerSetNamePayload> = {
  type: "string",
  minLength: 1,
};
