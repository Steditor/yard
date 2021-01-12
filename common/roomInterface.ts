export interface YardRoomJoinOptions {
  name?: string;
}

export const YardRoomJoinOptions = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
  },
  additionalProperties: false,
};
