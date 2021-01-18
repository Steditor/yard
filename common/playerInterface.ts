import { JSONSchemaType } from "ajv";

export type SetNamePayload = string;

export const SetNamePayload: JSONSchemaType<SetNamePayload> = {
  type: "string",
  minLength: 1,
};

export type MakeAdminPayload = string;

export const MakeAdminPayload: JSONSchemaType<MakeAdminPayload> = {
  type: "string",
  minLength: 15,
  maxLength: 15,
};
