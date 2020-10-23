import { YardPlayer } from "@/schema/YardPlayer";

export default class PlayerStore {
  name: string;
  color: string;
  position: {
    x: number;
    y: number;
  };

  constructor(player: YardPlayer) {
    this.name = player.name;
    this.color = player.color;

    this.position = {
      x: player.x,
      y: player.y,
    };

    this.watch(player);
  }

  private watch(player: YardPlayer) {
    player.onChange = (changes) => {
      changes.forEach((change) => {
        switch (change.field) {
          case "name":
            this.name = change.value;
            break;
          case "color":
            this.color = change.value;
            break;
          case "x":
            this.position.x = change.value;
            break;
          case "y":
            this.position.y = change.value;
        }
      });
    };
  }
}
