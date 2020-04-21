/**
 * Call the function `fn` n times before nullifying it.
 * @param fn
 * @param n
 */
export const thisManyTimes = <I extends any[], O>(
  fn: (...args: I) => O,
  n: number,
) => {
  let count = 0;
  return (...args: I): O | void => {
    if (count < n) {
      count++;
      return fn(...args);
    }
  };
};
