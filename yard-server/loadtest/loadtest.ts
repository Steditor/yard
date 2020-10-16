import { Room, Client } from "colyseus.js";

export function requestJoinOptions (this: Client, i: number) {
    return { };
}

let interval: NodeJS.Timeout | undefined;
let oldX: number = 0;
let oldY: number = 0;

export function onJoin(this: Room) {
    console.log(this.sessionId, "joined.");

    interval = setInterval(() => sendRandomMove(this), 100);
}

export function onLeave(this: Room) {
    console.log(this.sessionId, "left.");
    if (interval) {
        clearInterval(interval);
    }
}

export function onError(this: Room, err: any) {
    console.log(this.sessionId, "!! ERROR !!", err.message);
}

function sendRandomMove(room: Room) {
    room.send("move", randomMove());
}

function randomMove() {
    const speed = Math.random() * 4 + 1;
    const move = {
        x: randomDirection(oldX) * speed,
        y: randomDirection(oldY) * speed,
    }
    oldX = move.x;
    oldY = move.y;
    return move;
}

function randomDirection(old: number) {
    const rand = Math.random();
    if (rand < 3/9) {
        return old;
    } else if (rand < 5/9) {
        return -1
    } else if (rand < 7/9) {
        return 1;
    } else {
        return 0;
    }
}
