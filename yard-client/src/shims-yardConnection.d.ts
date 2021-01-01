import YardConnection from "./yardConnection/YardConnection";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $yardConnection: YardConnection;
  }
}
