import { JSONSchemaType } from "ajv";
import { SchemaProperties } from "./schema/helpers";
import { YardGameSettings } from "./schema/YardGameSettings";

export type SetGameSettingsPayload = Partial<SchemaProperties<YardGameSettings>>;

export const SetGameSettingsPayload: JSONSchemaType<SetGameSettingsPayload> = {
  type: "object",
  properties: {
    minPixelPerPerson: {
      type: "number",
      minimum: 0,
      nullable: true,
    },
    rope: {
      type: "boolean",
      nullable: true,
    },
  },
  required: [],
  additionalProperties: false,
};
