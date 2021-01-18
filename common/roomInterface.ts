import { JSONSchemaType } from "ajv";

export interface YardRoomJoinOptions {
  username?: string;
  initialModerationKey?: string;
}

export const YardRoomJoinOptions: JSONSchemaType<YardRoomJoinOptions> = {
  type: "object",
  properties: {
    username: {
      type: "string",
      nullable: true,
    },
    initialModerationKey: {
      type: "string",
      minLength: 15,
      maxLength: 15,
      nullable: true,
    },
  },
  required: [],
  additionalProperties: false,
}

export enum YardCloseCodes {
  KICKED = 4000,
}
