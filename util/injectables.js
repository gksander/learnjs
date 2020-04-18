// GCD function
function gcd(a = 1, b = 1) {
  return !b ? a : gcd(b, a % b);
}

// LCM function
function lcm(a = 1, b = 1) {
  return Math.abs(a * b) / gcd(a, b);
}

// Things we'll inject into function runtime
export const injectables = {
  // Disable console calls
  console: {},

  // Constants
  pi: Math.PI,
  PI: Math.PI,
  e: Math.E,

  // Trig functions
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  arcsin: Math.arcsin,
  acos: Math.acos,
  arccos: Math.acos,
  atan: Math.atan,
  arctan: Math.atan,

  // Exponential/trig
  exp: Math.exp,
  log: (x = 1, n = 10) => Math.log10(x) / Math.log10(n),
  ln: Math.log,

  // GCD/LCM
  gcd,
  lcm,

  // Auxillary
  pow: Math.pow,
  abs: Math.abs,
  sign: Math.sign,
  ceil: Math.ceil,
  floor: Math.floor,
  mod: (x = 1, n = 1) => x % n,
  sqrt: Math.sqrt,
  nroot: (x = 1, n = 1) => Math.pow(x, 1 / n),
  min: Math.min,
  max: Math.max,

  // Rounding
  round: (x = 1, n = 0) => Math.round(x * Math.pow(10, n)) / Math.pow(10, n),

  // Prime
  isPrime: (n) => {
    for (let i = 2; i <= Math.pow(n, 1 / 2); i++) {
      if (n % i === 0) return false;
    }
    return n !== 1;
  },
};

// Extract the keys, too
export const injectableKeys = Object.keys(injectables);
