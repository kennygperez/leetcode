type Token =
  | {
      type: "num";
      value: number;
    }
  | {
      type: "ops";
      value: string;
    };

function calculator(input: string): number {
  const tokens = getTokens(input);
  return calculatorHelper(tokens);
}

function calculatorHelper(tokens: Token[]): number {
  if (tokens.length === 0) {
    return 0;
  }

  const stack: Token[] = [];

  // handle ()
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.value === ")") {
      const slice: Token[] = [];
      let tmp: Token | undefined;

      while ((tmp = stack.pop())) {
        if (tmp.value === "(") {
          break;
        } else {
          slice.unshift(tmp);
        }
      }

      stack.push({
        type: "num",
        value: calculatorHelper(slice),
      });
    } else {
      stack.push(token);
    }
  }

  // handle the rest
  // handle *
  for (let i = 0; i < stack.length; i++) {
    const token = stack[i];

    if (token.value === "*") {
      const left: Token = stack[i - 1];
      const rite: Token = stack[i + 1];

      if (left.type === "num" && rite.type === "num") {
        stack.splice(i - 1, 3, { type: "num", value: left.value * rite.value });
        i = 0;
      }
    }
  }

  // handle /
  for (let i = 0; i < stack.length; i++) {
    const token = stack[i];

    if (token.value === "/") {
      const left: Token = stack[i - 1];
      const rite: Token = stack[i + 1];

      if (left.type === "num" && rite.type === "num") {
        stack.splice(i - 1, 3, { type: "num", value: left.value / rite.value });
        i = 0;
      }
    }
  }

  // handle a
  for (let i = 0; i < stack.length; i++) {
    const token = stack[i];

    if (token.value === "+") {
      const left: Token = stack[i - 1];
      const rite: Token = stack[i + 1];

      if (left.type === "num" && rite.type === "num") {
        stack.splice(i - 1, 3, { type: "num", value: left.value + rite.value });
        i = 0;
      }
    }
  }

  // handle s
  for (let i = 0; i < stack.length; i++) {
    const token = stack[i];

    if (token.value === "-") {
      const left: Token = stack[i - 1];
      const rite: Token = stack[i + 1];

      if (left.type === "num" && rite.type === "num") {
        stack.splice(i - 1, 3, { type: "num", value: left.value - rite.value });
        i = 0;
      }
    }
  }

  const lastToken = stack.pop();

  if (!lastToken || lastToken.type === "ops") {
    return 0;
  }

  return lastToken.value;
}

function getTokens(input: string): Token[] {
  const rawTokens = input.split(" ");
  const tokens: Token[] = [];

  for (const rawToken of rawTokens) {
    const value = Number.parseInt(rawToken, 10);

    if (Number.isNaN(value)) {
      tokens.push({ type: "ops", value: rawToken });
    } else {
      tokens.push({ type: "num", value });
    }
  }

  return tokens;
}

console.log(calculator("40 + ( 5 - ( 3 * 1 + 0 ) ) + 0 / 1") === 42);
