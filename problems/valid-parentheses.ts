/**
 * https://leetcode.com/problems/valid-parentheses/
 */
function isValid(s: string): boolean {
  const stack: string[] = [];
  let peak;

  for (const char of s) {
    switch (char) {
      // left
      case "(":
      case "{":
      case "[":
        stack.push(char);
        break;
      // right
      case ")":
        peak = stack[stack.length - 1];
        if (peak === "(") {
          stack.pop();
        } else {
          return false;
        }
        break;
      case "}":
        peak = stack[stack.length - 1];
        if (peak === "{") {
          stack.pop();
        } else {
          return false;
        }
        break;
      case "]":
        peak = stack[stack.length - 1];
        if (peak === "[") {
          stack.pop();
        } else {
          return false;
        }
        break;
    }
  }

  return stack.length === 0;
}

console.log("isValid()");
console.log(isValid("()") === true);
console.log(isValid("()[]{}") === true);
console.log(isValid("(]") === false);
console.log(isValid("([)]") === false);
console.log(isValid("{[]}") === true);
console.log(isValid("(])") === false);

const pairMap = {
  ")": "(",
  "}": "{",
  "]": "[",
} as Readonly<Record<string, string>>;

function isValidV2(s: string): boolean {
  const stack: string[] = [];
  let peak: string;

  for (const token of s) {
    if (token === "(" || token === "{" || token === "[") {
      stack.push(token);
      continue;
    }

    peak = stack[stack.length - 1];

    if (peak === pairMap[token]) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length === 0;
}

console.log("isValidV2()");
console.log(isValidV2("()") === true);
console.log(isValidV2("()[]{}") === true);
console.log(isValidV2("(]") === false);
console.log(isValidV2("([)]") === false);
console.log(isValidV2("{[]}") === true);
console.log(isValidV2("(])") === false);

const tokenStrToIntMap = {
  "(": -1,
  "{": -2,
  "[": -3,
  ")": 1,
  "}": 2,
  "]": 3,
} as Readonly<Record<string, number>>;

function isValidV3(s: string): boolean {
  const stack: number[] = [];

  for (const rawToken of s) {
    const numToken = tokenStrToIntMap[rawToken];

    // was (, {, or [
    if (numToken < 0) {
      stack.push(numToken);
      continue;
    }

    const last = stack[stack.length - 1];

    if (Math.abs(last) === numToken) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length === 0;
}

console.log("isValidV3()");
console.log(isValidV3("()") === true);
console.log(isValidV3("()[]{}") === true);
console.log(isValidV3("(]") === false);
console.log(isValidV3("([)]") === false);
console.log(isValidV3("{[]}") === true);
console.log(isValidV3("(])") === false);
