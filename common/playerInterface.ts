import { JSONSchemaType } from "ajv";

export type YardPlayerSetNamePayload = string;

export const YardPlayerSetNamePayload: JSONSchemaType<YardPlayerSetNamePayload> = {
  type: "string",
  minLength: 1,
};

export type YardMakeAdminPayload = string;

export const YardMakeAdminPayload: JSONSchemaType<YardMakeAdminPayload> = {
  type: "string",
  minLength: 15,
  maxLength: 15,
};
