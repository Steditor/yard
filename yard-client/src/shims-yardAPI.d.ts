import YardAPI from "./yardAPI/YardAPI";

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $yardAPI: YardAPI;
  }
}
