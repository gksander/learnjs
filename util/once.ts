/**
 * Function that executes a passed fn only once
 * @param fn Function
 */
import { thisManyTimes } from "./thisManyTimes";

export const once = <T extends Array<any>, U>(fn: (...args: T) => U) =>
  thisManyTimes(fn, 1);
