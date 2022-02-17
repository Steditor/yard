import { JSONSchemaType } from "ajv";

export type SetNamePayload = string;

export const SetNamePayload: JSONSchemaType<SetNamePayload> = {
  type: "string",
  minLength: 1,
};

export type BecomeAdminPayload = string;

export const BecomeAdminPayload: JSONSchemaType<BecomeAdminPayload> = {
  type: "string",
  minLength: 15,
  maxLength: 15,
};

export type SessionIdPayload = string;

export const SessionIdPayload: JSONSchemaType<SessionIdPayload> = {
  type: "string",
  minLength: 1,
};
