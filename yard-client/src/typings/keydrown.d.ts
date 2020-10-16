declare module "keydrown" {
  class Key {
    down(handler: (event: KeyboardEvent) => void): void;
    unbindDown(): void;
    up(handler: (event: KeyboardEvent) => void): void;
    unbindUp(): void;
    press(handler: (event: KeyboardEvent) => void): void;
    unbindPress(): void;
    isDown(): boolean;
  }

  function tick();
  function run(handler: () => void);
  function stop();

  export default {
    Key,
    tick,
    run,
    stop,
    UP: Key,
    Down: Key,
    LEFT: Key,
    RIGHT: Key,
    // ... more keys
  };
}
