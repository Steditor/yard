import { JSONSchemaType } from "ajv";

export interface MovePayload {
  p: string; // pixel id
  a: number; // transport data is non-negative angle in 1/3 degrees
}

export const MovePayload: JSONSchemaType<MovePayload> = {
  type: "object",
  properties: {
    p: {
      type: "string",
      minLength: 9,
      maxLength: 9,
    },
    a: {
      type: "number",
      minimum: 0,
      maximum: 120, // transport data is non-negative angle in 1/3 degrees
    }
  },
  required: [ "p", "a" ],
  additionalProperties: false,
};
