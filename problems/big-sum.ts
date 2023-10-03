// We would like to calculate the sum of two large integers. These integers are
// so large that they cannot be expressed by our language's built-in numeric types
// and will instead be represented as strings (imagine a million+ characters).
//
// We can still perform mathematical operations on smaller intermediary values.
//
// How can we write a function to add two numbers if our inputs are larger than
// our language allows?
//
// We expect our output to be a string since it may also be too big!

import { expect } from "chai";

// uint uint
// S(N^2)
// O(N)
function bigSum(first: string, second: string): string {
  const num1 = first.split("").map(Number);
  const num2 = second.split("").map(Number);
  let carry: boolean = false;
  let result: string = "";
  let dig1: number | undefined;
  let dig2: number | undefined;

  while (num1.length > 0 || num2.length > 0) {
    dig1 = num1.pop() || 0;
    dig2 = num2.pop() || 0;

    let tempResult = dig1 + dig2;

    if (carry) {
      tempResult += 1;
    }

    if (tempResult >= 10) {
      carry = true;
    } else {
      carry = false;
    }

    tempResult %= 10;

    result = tempResult.toString() + result;
  }

  if (carry) {
    result = "1" + result;
  }

  return result;
}

expect(bigSum("1", "1")).to.equal("2");
expect(bigSum("7", "7")).to.equal("14");
expect(bigSum("10", "1")).to.equal("11");
expect(bigSum("22", "20")).to.equal("42");
expect(bigSum("400", "20")).to.equal("420");
expect(bigSum("9999", "1")).to.equal("10000");
expect(bigSum("1", "9999")).to.equal("10000");
expect(bigSum("", "42")).to.equal("42");

console.log("All tests passed! 🎉");
