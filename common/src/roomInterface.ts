import { JSONSchemaType } from "ajv";

import { YardSettings } from "./schema/YardSettings";
import { SchemaProperties } from "./schema/helpers";

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
};

export enum YardCloseCodes {
  KICKED = 4000,
}

export type SetSettingsPayload = Partial<
  Pick<
    SchemaProperties<YardSettings>,
    | "canvasWidth"
    | "canvasHeight"
    | "backgroundCode"
    | "pixelSize"
    | "playerNameMaxLength"
  >
>;

export const SetSettingsPayload: JSONSchemaType<SetSettingsPayload> = {
  type: "object",
  properties: {
    canvasWidth: {
      type: "number",
      minimum: 100,
      nullable: true,
    },
    canvasHeight: {
      type: "number",
      minimum: 100,
      nullable: true,
    },
    backgroundCode: {
      type: "string",
      maxLength: 2 * 1024 * 1024,
      nullable: true,
    },
    pixelSize: {
      type: "number",
      minimum: 1,
      nullable: true,
    },
    playerNameMaxLength: {
      type: "number",
      minimum: 5,
      nullable: true,
    },
  },
  required: [],
  additionalProperties: false,
};
