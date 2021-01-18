import { JSONSchemaType } from "ajv";

export interface YardRoomCreateOptions {
  initialModerationKey: string;
}

export const YardRoomCreateOptions: JSONSchemaType<YardRoomCreateOptions> = {
  type: "object",
  properties: {
    initialModerationKey: {
      type: "string",
      minLength: 15,
      maxLength: 15,
    },
  },
  additionalProperties: false,
  required: [ "initialModerationKey" ],
}

export type YardRoomJoinOptions = Partial<YardRoomCreateOptions> & {
  name?: string;
}

// : JSONSchemaType<YardRoomJoinOptions>, but does not work due to a ajv error
export const YardRoomJoinOptions = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    initialModerationKey: {
      type: "string",
      minLength: 15,
      maxLength: 15,
    }
  },
  additionalProperties: false,
};

export enum YardCloseCodes {
  KICKED = 4000,
}
