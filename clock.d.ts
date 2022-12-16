/// <reference path="./core.d.ts" />

declare namespace Clock {
  /**
   * A timestamp in nanoseconds.
   *
   * ```
   * Size:      8 Bytes
   * Alignment: 8 Bytes
   * ```
   */
  export type Instant = bigint;

  /**
   * A time and date in seconds plus nanoseconds.
   *
   * ```
   * Size:      16 Bytes
   * Alignment: 8 Bytes
   * ```
   */
  export type DateTime = { seconds: Core.u64; nanoseconds: Core.u32 };

  export interface MonotonicClock {
    /** Read the current value of the clock. */
    now(): Instant;

    /** Query the resolution of the clock. */
    resolution(): Instant;

    /**
     * This creates a new `MonotonicTimer` with a given starting time.
     *
     * It will count down from this time until it reaches zero.
     */
    newTimer(initial: Instant): MonotonicTimer;
  }

  export interface WallClock {
    /** Read the current value of the clock. */
    now(): DateTime;

    /** Query the resolution of the clock. */
    resolution(): DateTime;
  }

  export interface MonotonicTimer {
    /** Returns the amount of time left before this timer reaches zero. */
    current(): Instant;

    /** Returns a promise that completes when the timer reaches zero. */
    expiration(): Promise<void>;
  }
}
