/// <reference path="./core.d.ts" />
/// <reference path="./clock.d.ts" />

declare namespace WASI {
  export const core: typeof Core;
  // export const logging: typeof Logging;
  export const clock: typeof Clock;
  // export const random: typeof Random;
  // export const poll: typeof Poll;
  // export const file: typeof File;
  // export const dir: typeof Dir;
  // export const net: typeof Net;
  // export const ip: typeof IP;
  // export const tcp: typeof TCP;
}
