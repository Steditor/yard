import express from "express";
import { nanoid } from "nanoid";

const app = express();

const roomMapping = new Map<string, Set<string>>(); // room id to set of string ids
const strings = new Map<string, string>(); // string id to string

// default empty background
strings.set("emptyback", '<svg xmlns="http://www.w3.org/2000/svg"></svg>');

function addString(roomId: string, value: string): string {
  const id = nanoid(9);
  strings.set(id, value);
  if (!roomMapping.has(roomId)) {
    roomMapping.set(roomId, new Set());
  }
  roomMapping.get(roomId)?.add(id);
  return id;
}

function removeString(stringId: string, roomId: string): void {
  if (roomMapping.get(roomId)?.has(stringId)) {
    roomMapping.get(roomId)?.delete(stringId);
    strings.delete(stringId);
  }
}

function removeRoom(roomId: string): void {
  const roomStrings = roomMapping.get(roomId);
  if (roomStrings) {
    roomMapping.delete(roomId);
    roomStrings.forEach((stringId) => strings.delete(stringId));
  }
}

app.get("/:stringId", (req, res) => {
  if (req.params.stringId.length !== 9) {
    res.status(400).send("Invalid string id.");
  } else {
    const string = strings.get(req.params.stringId);
    if (string === undefined) {
      res.status(404).send("String not found.");
    } else {
      res.status(200).send(string);
    }
  }
});

const StringRepository = {
  app,
  addString,
  removeString,
  removeRoom,
};

export default StringRepository;
